import React from 'react'
import styles from './OrderFinish.module.css';
import Button from "../Button";
import {useHistory} from "react-router-dom";
import logo from '../../assets/images/order-success.png';

const OrderFinish: React.FC = () => {
    const history = useHistory();
    const onClick = () => {
        return history.push("/catalog");
    }
    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" />
            <h2 className={styles.title}>
                Ваш заказ завершен
            </h2>
            <div className={styles.subtitle}>
                Благодарим Вас за покупку!
            </div>
            <br/>
            <Button className={styles.button} onClick={onClick}>Продолжить покупки</Button>
        </div>
    )
}

export default OrderFinish;