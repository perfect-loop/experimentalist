import { validateCurrency } from "../helpers";

jest.mock("models/Helpers", () => {
  return {
    ACCEPTED_CURRENCIES: ["USD", "CAD", "AUD", "EUR"],
  };
});

describe("validateCurrency", () => {
  describe("venmo", () => {
    it("returns an error if currency is invalid", () => {
      const uploadedData = {};
      validateCurrency("asas", "venmo", uploadedData);
      expect(uploadedData["error"]).toBe("Currency is not accepted. Please use USD.");
    });

    it("does not return an error if currency is valid", () => {
      const uploadedData = {};
      validateCurrency("USD", "venmo", uploadedData);
      expect(uploadedData["error"]).toBeNUll;
    });
  });

  describe("paypal", () => {
    it("returns an error if currency is invalid", () => {
      const uploadedData = {};
      validateCurrency("INR", "paypal", uploadedData);
      expect(uploadedData["error"]).toBe("Currency is not accepted. Accepted currencies are USD,CAD,AUD,EUR.");
    });

    it("does not return an error if currency is valid", () => {
      const uploadedData = {};
      validateCurrency("AUD", "venmo", uploadedData);
      expect(uploadedData["error"]).toBeNUll;
    });
  });
});
