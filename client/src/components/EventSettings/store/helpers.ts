export const paymentMethod = (method: string) => {
  switch (method) {
    case "venmo":
      return "Venmo";
    case "paypal":
      return "PayPal";
    case "none":
      return "None";
  }
};
