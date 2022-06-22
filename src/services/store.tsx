import React, { ReactNode, useState } from "react";
import { useContext } from "react";
import { products } from "./fakeData";
import {TOrder} from "../domain/order";
import {TCart} from "../domain/cart";
import {TUser} from "../domain/user";

const StoreContext = React.createContext<any>({});
export const useStore = () => useContext(StoreContext);

interface IProps{
    children: ReactNode,
}

export const Provider: React.FC<IProps> = ({ children }) => {
  const getInitialUser: TUser[] = JSON.parse(localStorage.getItem('user'));
  const getInitialOrders: TOrder[] = JSON.parse(localStorage.getItem('orders')) || [];

  const [user, setUser] = useState<TUser[]>(getInitialUser);
  const [cart, setCart] = useState<TCart>({ products: [], totalPrice: '0'});
  const [orders, setOrders] = useState<TOrder[]>(getInitialOrders);

  const updateUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const updateOrders = (order: TOrder) => {
    // @ts-ignore
    setOrders(order)
    localStorage.setItem('orders', JSON.stringify(order))
  }

  const value = {
    user,
    cart,
    products,
    orders,
    updateUser: updateUser,
    updateCart: setCart,
    updateOrders: updateOrders,
    emptyCart: () => setCart({ products: [],  totalPrice: '0' }),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
