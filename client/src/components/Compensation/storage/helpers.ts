import { ICompensation } from "models/Compensations";
import { ACCEPTED_CURRENCIES } from "models/Helpers";

export interface IUploadedData extends Pick<ICompensation, "amount"> {
  email: string;
  amount: number;
  currency: string;
}

export interface CompensationData {
  amount: number;
  currency: string;
}

export interface IProcessedData {
  [i: string]: CompensationData;
}

export interface IRawUploadedData {
  data: [string, number, string];
  error?: string;
}

export const validateCurrency = (currency: string, method: string, uploadedData: IRawUploadedData) => {
  switch (method) {
    case "venmo":
      if (currency !== "USD") {
        uploadedData["error"] = "Currency is not accepted. Please use USD.";
      }
      break;
    case "paypal":
      if (!ACCEPTED_CURRENCIES.includes(currency)) {
        uploadedData.error = `Currency is not accepted. Accepted currencies are ${ACCEPTED_CURRENCIES}.`;
      }
      break;
  }
};

export const formattedAmount = (currency: string, amount: number) => {
  switch (currency) {
    case "USD":
      return `$${amount}`;
      break;
    case "CAD":
      return `C$${amount}`;
      break;
    case "AUD":
      return `A$${amount}`;
      break;
    case "EUR":
      return `€$${amount}`;
      break;
  }
};
