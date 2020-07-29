import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import Api from "api/Venmo";
import Axios from "axios";
import { OnUnhandledRejection } from "@sentry/node/dist/integrations";

// TODO: change to Logger but need to move API into src
const logger = console;

interface IVenmoAccountInfo {
  username: string;
  profile_picture_url: string;
  id: string;
}
export interface IVenmoAccount {
  user: IVenmoAccountInfo;
  balance: string;
}

export interface IVenmoUser {
  username: string;
  profile_picture_url: string;
  id: string;
  date_joined: string;
  about: string;
  display_name: string;
  email: string;
}

interface IPayment {
  status: string;
  id: string;
  date_completed: string;
  note?: string;
  amount: number;
  target: any;
  actor: IVenmoUser;
}

export interface IPaymentDetail {
  balance: string;
  payment: IPayment;
  redirect_url: string;
}

// interface IPaymentError {
//   error_code: number,
//   error_message: string,
//   title: string,
//   route: string
// }

export class VenmoApi {
  configuration: any;
  defaultHeaders: any;
  deviceId: string;

  /**
   * AuthToken is a long term token, we don't currently need a help function to generate it using venmo auth flow
   */

  constructor() {
    this.configuration = { host: "https://api.venmo.com/v1" };
    this.deviceId = this.randomDeviceId();
    this.defaultHeaders = {
      "User-Agent": "Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)",
      "device-id": this.deviceId
    };
  }

  /**
   * Returns a list of venmo users with basic info (name, profile image)
   */
  public userSearch(query: string, authToken: string): Promise<IVenmoUser[]> {
    const url = `/users?query=${query}`;
    this.defaultHeaders["Authorization"] = `Bearer: ${authToken}`;
    return new Promise((resolve, reject) => {
      this.get(url)
        .then((response: AxiosResponse) => {
          const { data } = response;
          logger.info(`[userSearch] Found users ${JSON.stringify(data)}`);
          resolve(data.data);
        })
        .catch((error: AxiosError) => {
          logger.error(`[userSearch] Error occurred ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Request 2FA code to be sent to the user
   *
   * @param token
   */
  public authenticate2Factor(authtoken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const resourcePath = "/account/two-factor/token";
      const body = {
        via: "sms",
        client_id: "1"
      };
      const headers = {
        "venmo-otp-secret": authtoken,
        "Content-Type": "application/json"
      };

      this.post(resourcePath, body, headers)
        .then((response: AxiosResponse<any>) => {
          resolve(true);
        })
        .catch((error: AxiosError) => {
          logger.error("Unable to send 2FA request");
          logger.error(error.message);
          reject(false);
        });
    });
  }

  public mfaAuthenticate(otpSecret: string, otpCode: string): Promise<string> {
    const resourcePath = `/oauth/access_token?client_id=1`;
    const headers = {
      "venmo-otp-secret": otpSecret,
      "venmo-otp": otpCode
    };
    return new Promise((resolve, reject) => {
      this.post(resourcePath, {}, headers)
        .then((response: AxiosResponse<any>) => {
          const { data } = response;
          logger.info(`[mfaAuthenticate] Access token is ${data.access_token}`);
          resolve(data.access_token);
        })
        .catch((error: AxiosError) => {
          logger.error("[mfaAuthenticate] Unable to do mfaAuthenticate");
          logger.error(`${JSON.stringify(error.response?.data)}`);
          reject(undefined);
        });
    });
  }
  /**
   *
   * Take a note of your device id to avoid 2-Factor-Authentication for your next login
   *
   * @param username
   * @param password
   */
  public login(
    username: string,
    password: string
  ): Promise<string | undefined> {
    const body = {
      phone_email_or_username: username,
      client_id: "1",
      password: password
    };
    const resourcePath = "/oauth/access_token";
    const headers = {
      "Content-Type": "application/json"
    };
    return new Promise((resolve, reject) => {
      this.post(resourcePath, body, headers)
        .then((response: AxiosResponse<any>) => {
          logger.error("Didn't get anything useful from venmo");
          logger.error(response);
          reject(undefined);
        })
        .catch((error: any) => {
          if (!error.response) {
            logger.error("Unexepcted response from venmo");
            resolve(undefined);
          }

          const { data } = error.response;
          if (data["error"]["code"] === 81109) {
            logger.info("Need to get 2FA");
            const headers = error.response.headers;
            const venmoOtpSecret = headers["venmo-otp-secret"];
            resolve(venmoOtpSecret);
            return;
          }
        });
    });
  }

  /**
   * Pay to the user
   * Should return an object containing at least the transaction id.
   * This will later be saved into database and shown on the compensation
   *
   */
  public async pay(
    authToken: string,
    targetUserId: string,
    amount: number,
    chosenMethod: Api.Venmo.PaymentRole,
    note?: string,
    selectedFundingSourceId?: string
  ): Promise<IPaymentDetail> {
    this.defaultHeaders["Authorization"] = authToken;

    const fundingSourceId = await this.pickFundingSource(
      authToken,
      selectedFundingSourceId,
      chosenMethod,
      amount
    );

    if (!fundingSourceId) {
      return new Promise((resolve, reject) => {
        reject("Funding source is not valid");
      });
    }

    const url = "/payments";
    logger.info(`[pay] fundingSourceId is ${fundingSourceId}`);

    const data = {
      user_id: targetUserId,
      audience: "private",
      amount,
      note,
      finding_source_id: fundingSourceId
    };

    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/json"
      };
      this.post(url, data, headers)
        .then((response: AxiosResponse) => {
          const { data } = response;
          if ("error_code" in data.data) {
            logger.warn(`[pay] Error code returned ${JSON.stringify(data)}`);
            reject(data.data);
          }
          resolve(data.data);
        })
        .catch((error: AxiosError) => {
          logger.error(`[pay] Unable to pay: ${error.message}`);
          logger.error(`[pay] data is ${JSON.stringify(error.response?.data)}`);
          reject(error.response?.data);
        });
    });
  }

  /**
   *
   * @param selectedFundingSourceId funding source selected by the user
   */
  private async pickFundingSource(
    authToken: string,
    selectedFundingSourceId: string | undefined,
    chosenMethod: string,
    amount: number
  ): Promise<string | undefined> {
    // For some reason, even if fundingSource is provided,
    // venmo seems to require reading paymentMethod
    const paymentMethods: Api.Venmo.IPaymentMethod[] = await this.getPaymentMethods(
      authToken
    );

    let fundingSourceId: string | undefined = undefined;

    //  get default payment method
    for (const method of paymentMethods) {
      if (method.peer_payment_role === chosenMethod) {
        fundingSourceId = method.id;
      }
    }
    if (paymentMethods.length === 0) {
      logger.error("No payment method found");
    }

    if (selectedFundingSourceId) {
      // if amount to be paid is more than the balance, use the provided funding source
      // as the backup
      const balance = await this.getCurrentBalance(authToken);
      if (balance && balance > amount) {
        logger.info("[pickFundingSource] Using selected funding source");
        fundingSourceId = selectedFundingSourceId;
      }
    }

    logger.info("[pickFundingSource] Final fundingSource is ", fundingSourceId);
    return fundingSourceId;
  }

  public getPaymentMethods(
    authToken: string
  ): Promise<Api.Venmo.IPaymentMethod[]> {
    const url = "/payment-methods";
    this.defaultHeaders["Authorization"] = `Bearer: ${authToken}`;
    return new Promise((resolve, reject) => {
      this.get(url)
        .then((response: AxiosResponse) => {
          const { data } = response;
          resolve(data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  public getCurrentBalance(authToken: string): number | undefined {
    this.getAccount(authToken)
      .then((account: IVenmoAccount) => {
        logger.info("[getCurrentBalance] balance is ", account.balance);
        return parseInt(account.balance);
      })
      .catch((error: AxiosError) => {
        logger.error("[getCurrentBalance] Error ", error.message);
        return undefined;
      });
    return undefined;
  }

  public getAccount(authToken: string): Promise<IVenmoAccount> {
    const url = "/account";
    this.defaultHeaders["Authorization"] = `Bearer: ${authToken}`;
    return new Promise((resolve, reject) => {
      this.get(url)
        .then((response: AxiosResponse) => {
          const { data } = response;
          resolve(data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  private get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const api = axios.create({
      baseURL: this.configuration.host,
      headers: this.defaultHeaders,
      ...config
    });

    return api.get(url);
  }

  private post<T, R = AxiosResponse<T>>(
    url: string,
    data: any,
    headers?: any
  ): Promise<R> {
    const hders = Object.assign({}, this.defaultHeaders, headers);
    logger.info("[post]headers are", hders);
    data = JSON.stringify(data);
    logger.info(`[post] data is ${data}`);

    const api = axios.create({
      baseURL: this.configuration.host,
      headers: hders
    });

    return api.post(url, data);
  }

  private randomDeviceId(): string {
    const BASE_DEVICE_ID = "88884261-05O3-8U81-58I1-2WA76F357GR9";
    return BASE_DEVICE_ID;
  }
}
