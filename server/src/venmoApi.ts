import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

export type PaymentRole = "default" | "backup";

interface IVenmoUser {
  username: string;
  profile_picture_url: string;
  id: string;
  date_joined: string;
  about: string;
  display_name: string;
  email: string;
}

interface IPaymentMethod {
  id: string;
  name: string;
  peer_payment_role: PaymentRole;
  last_four: string;
  type: string;
  image_url?: string;
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

interface IPaymentDetail {
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
  authToken: string | null;
  configuration: any;
  defaultHeaders: any;

  /**
   * AuthToken is a long term token, we don't currently need a help function to generate it using venmo auth flow
   */

  constructor(authToken: string) {
    this.authToken = this.validateToken(authToken);
    this.configuration = { host: "https://api.venmo.com/v1" };
    // this.deviceId = "";
    this.defaultHeaders = {
      "User-Agent": "Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)"
    };
    if (this.authToken) {
      this.defaultHeaders["Authorization"] = this.authToken;
    }
  }

  /**
   * Returns a list of venmo users with basic info (name, profile image)
   */
  public userSearch(query: string): Promise<IVenmoUser[]> {
    const url = `/users?query=${query}`;
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

  /**
   * Pay to the user
   * Should return an object containing at least the transaction id.
   * This will later be saved into database and shown on the compensation
   *
   */
  public async pay(
    targetUserId: string,
    amount: number,
    chosenMethod: PaymentRole,
    note?: string,
    fundingSourceId?: string
  ): Promise<IPaymentDetail> {
    if (!fundingSourceId) {
      const paymentMethods: IPaymentMethod[] = await this.getPaymentMethods();
      // get default payment method
      for (const method of paymentMethods) {
        if (method.peer_payment_role === chosenMethod) {
          fundingSourceId = method.id;
        }
      }
      if (paymentMethods.length === 0) {
        console.log("No payment method found");
      }
    }
    const url = "/payments";

    const data = {
      user_id: targetUserId,
      audience: "private",
      amount,
      note,
      funding_source_id: fundingSourceId
    };

    return new Promise((resolve, reject) => {
      this.post(url, data)
        .then((response: AxiosResponse) => {
          const { data } = response;
          if ("error_code" in data.data) {
            reject(data.data);
          }
          resolve(data.data);
        })
        .catch((error: AxiosError) => {
          reject(error.response);
        });
    });
  }

  public getPaymentMethods(): Promise<IPaymentMethod[]> {
    const url = "/payment-methods";
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

  private validateToken(authToken: string) {
    if (!authToken || authToken.length === 0) return null;

    if (authToken.slice(0, 8) != "Bearer: ") {
      return `Bearer: ${authToken}`;
    }

    return authToken;
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
    config?: AxiosRequestConfig
  ): Promise<R> {
    const headers = Object.assign({}, this.defaultHeaders, {
      "Content-Type": "application/json"
    });
    data = JSON.stringify(data);
    const api = axios.create({
      baseURL: this.configuration.host,
      headers: headers,
      ...config
    });

    return api.post(url, data);
  }
}
