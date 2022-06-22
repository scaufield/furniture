import {
  CartStorageService,
  OrdersStorageService,
  UserStorageService,
} from "../application/ports";
import { useStore } from "./store";


// Также можно разделить все хранилище на атомарные хранилища.
// Внутри соответствующих хуков мы можем применять мемоизацию, оптимизации, селекторы...
// Ну, вы поняли.

export function useUserStorage(): UserStorageService {
  return useStore();
}

export function useCartStorage(): CartStorageService {
  return useStore();
}

export function useOrdersStorage(): OrdersStorageService {
  return useStore();
}
