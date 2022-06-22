import React, {useState} from "react";
import styles from "./Order.module.css";
import Button from "../Button";
import _ from "lodash";

export const Order = ({order}) => {
    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const getDate = (orderDate) => {
        const [date, time] = orderDate.split("T");
        return date + " " + time.substring(0, 5);
    }

    const getCartItems = (item) => {
        const list = Object.values(item)
        return (
            <li className={styles.listItem}>
                <div>Наименование: {list[0].toString()} </div>
                <div>Цвет: {list[1].toString()} </div>
                <div>Материал: {list[2].toString()} </div>
                <div>Цена, шт: {list[3].toString()} </div>
                <div>Количество: {list[4].toString()} </div>
            </li>
        )

    }
    return (
        <li key={order.created} className={styles.order}>
            <div>
                <div className={styles.created}>{getDate(order?.created)}</div>
                <div className={styles.status}>{order.status}</div>
                <div className={styles.address}>Адрес: {order.address}</div>
                <div className={styles.button}>
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Свернуть' : 'Развернуть подробности'
                        }
                    </Button>
                </div>

                <div className={`${styles.cart} ${descriptionExpand ? styles.expand : ''}`}>
                    <div className={styles.content}>
                        {
                            order.cart.map(item => <ul key={_.uniqueId()}  className={styles.list}>
                                <div className={styles.listTitle}>Товар:</div>
                                {getCartItems(item)}</ul>)
                        }
                    </div>
                </div>
            </div>
            <div className={styles.total}>Сумма: {order.total}</div>
        </li>
    )
}