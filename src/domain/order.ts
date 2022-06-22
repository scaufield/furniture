import { currentDatetime } from "../lib/datetime";
import { TCart } from "./cart";
import { TUser } from "./user";

export type OrderStatus = "new" | "delivery" | "completed";

export type TOrder = {
  user: TUniqueId;
  cart: TCart;
  created: TDateTimeString;
  status: OrderStatus;
  total: TPrice;
  address: string;
};

export function createOrder(user: TUser, cart: TCart, totalPrice: string, address: string): TOrder {
  return {
    cart,
    user: user.id,
    status: "new",
    created: currentDatetime(),
    total: totalPrice,
    address: address,
  };
}
