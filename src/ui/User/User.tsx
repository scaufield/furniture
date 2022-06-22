import {useOrdersStorage, useUserStorage} from "../../services/storageAdapter";
import {Orders} from "../Orders";
import {Profile} from "../Profile";
import Button from "../Button";
import {OrdersStorageService, UserStorageService} from "../../application/ports";
import React from "react";
import {useHistory} from "react-router-dom";
import styles from "./User.module.css";


export const User = () => {
    const userStorage: UserStorageService = useUserStorage();
    const orderStorage: OrdersStorageService = useOrdersStorage();
    const history = useHistory();

    const logout = () => {
        userStorage.updateUser(null);
        orderStorage.updateOrders([])
        history.push("/");
    }
    return (
        <main className={styles.container}>
            <div className={styles.head}>
                <div className={styles.profile}>
                    <Profile/>
                </div>
                <Button onClick={logout}>Выйти</Button>
            </div>
            <Orders/>
        </main>
    );
}
