import {useOrdersStorage} from "../../services/storageAdapter";
import React from "react";
import styles from "./Orders.module.css";
import {Order} from "../Order";
import _ from "lodash";

export const Orders: React.FC = () => {
    const {orders} = useOrdersStorage();
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Заказы</h2>
            {orders.length !== 0 ?
                <ul className={styles.orders}>
                    {orders.map((order) => (
                        <Order key={_.uniqueId()} order={order}/>
                    ))}
                </ul>
                :
                <div className={styles.emptyOrders}>Заказов еще нет</div>
            }
        </section>
    )
}