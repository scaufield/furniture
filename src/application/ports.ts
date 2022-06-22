import { TCart } from "../domain/cart";
import { TOrder } from "../domain/order";
import { TUser, TUserName } from "../domain/user";

export interface UserStorageService {
  user?: TUser;
  updateUser(user: TUser): void;
}

export interface CartStorageService {
  cart: TCart;
  updateCart(cart: TCart): void;
  emptyCart(): void;
}

export interface OrdersStorageService {
  orders: TOrder[];
  updateOrders(orders: TOrder[]): void;
}

export interface AuthenticationService {
  auth(name: TUserName, email: TEmail): Promise<TUser>;
}

export interface NotificationService {
  notify(message: string): void;
}

export interface PaymentService {
  tryPay(amount: TPrice): Promise<boolean>;
}
