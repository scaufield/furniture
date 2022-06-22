import { PaymentService } from "../application/ports";
import { fakeApi } from "./api";

export function usePayment(): PaymentService {
  return {
    tryPay(amount: TPrice) {
      return fakeApi(true);
    },
  };
}
