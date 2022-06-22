import { TProduct } from "../domain/product";
import { TUser } from "../domain/user";
import { addProduct } from "../domain/cart";

import { CartStorageService, NotificationService } from "./ports";
import { useCartStorage } from "../services/storageAdapter";
import { useNotifier } from "../services/notificationAdapter";

export function useAddToCart() {
    const storage: CartStorageService = useCartStorage();
    const notifier: NotificationService = useNotifier();

    function addToCart(user: TUser, product: TProduct): void {
        const warning = "This cookie is dangerous to your health! 😱";

        const { cart } = storage;
        const updated = addProduct(cart, product);
        storage.updateCart(updated);
    }

    return { addToCart };
}
