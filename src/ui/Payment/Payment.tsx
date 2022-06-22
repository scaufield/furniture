import React, {useState} from "react";
import {useOrderProducts} from "../../application/orderProducts";
import {TUser, TUserName} from "../../domain/user";
import {useUserStorage} from "../../services/storageAdapter";
import styles from "./Payment.module.css";
import Button from "../Button";
import {TCart} from "../../domain/cart";
import {useAuthenticate} from "../../application/authenticate";

interface IProps {
    onClick: () => void;
    onCancelClick: () => void;
    totalPrice: string;
    cart: TCart;
}

export const Payment: React.FC<IProps> = ({onClick, onCancelClick, totalPrice, cart}) => {
    const {orderProducts} = useOrderProducts();
    const {user} = useUserStorage();
    const {authenticate} = useAuthenticate();

    const [name, setName] = useState<TUserName>(user?.name ?? "");
    const [email, setEmail] = useState<TEmail>(user?.email ?? "");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();
        !user && await authenticate(name, email);
        const newUser: TUser = {
            name, email, id: "sample-user-id"
        }
        await orderProducts(user ? user : newUser, cart, totalPrice, address);
        onClick();
        setLoading(false);
    }

    return (
        <section className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    placeholder="Имя"
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                <input
                    placeholder="Почта"
                    className={styles.input}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                    placeholder="Адрес"
                    className={styles.input}
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                <div className={styles.buttons}>
                    <Button disabled={loading} onClick={onCancelClick}>
                        Назад
                    </Button>
                    <Button backgroundColor="black" textColor="white" type="submit" disabled={loading}>
                        {loading ? "Подготовка к оплате..." : `Оплатить ${totalPrice}`}
                    </Button>
                </div>
            </form>
        </section>
    );
}
