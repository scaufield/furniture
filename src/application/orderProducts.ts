import {TUser} from "../domain/user";
import {TCart} from "../domain/cart";
import {createOrder} from "../domain/order";

// Обратите внимание, что интерфейсы портов находятся на _прикладном уровне_,
// но их реализация находится в слое _adapter_.
import {usePayment} from "../services/paymentAdapter";
import {useNotifier} from "../services/notificationAdapter";
import {useOrdersStorage} from "../services/storageAdapter";
import {removeAll} from "../services/redux/shopping-cart/cartItemsSlide";
import {useDispatch} from "react-redux";

export function useOrderProducts() {
    const dispatch = useDispatch()
// Обычно мы обращаемся к сервисам через Dependency Injection.
// Здесь мы можем использовать хуки в качестве кривого «DI-контейнера».
    const notifier = useNotifier();
    const payment = usePayment();
    const orderStorage = useOrdersStorage();
// Мы также можем получить `user` и `cart` прямо здесь через соответствующие хуки
// и не передавать их в качестве аргументов функции.

// В идеале мы должны передать команду в качестве аргумента,
// который будет инкапсулировать все входные данные.
    async function orderProducts(user: TUser, cart: TCart, totalPrice: string, address: string) {
// Здесь мы можем проверить данные перед созданием ордера.
        const order = createOrder(user, cart, totalPrice, address);


        // Функция прецедента не вызывает сторонние сервисы напрямую,
// вместо этого он опирается на интерфейсы, которые мы объявили ранее.
        const paid = await payment.tryPay(order.total);
        if (!paid) return notifier.notify("Произошла ошибка при оплате");


// А здесь мы можем сохранить заказ на сервере, если это необходимо.
        const {orders} = orderStorage;
        orderStorage.updateOrders([...orders, order]);
        dispatch(removeAll())
    }

    return {orderProducts};
}
