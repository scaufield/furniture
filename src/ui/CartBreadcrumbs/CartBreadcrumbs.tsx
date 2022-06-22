import React from 'react'
import styles from './CartBreadcrumbs.module.css';

interface IProps {
    active: number;
}

const CartBreadcrumbs: React.FC<IProps> = ({active}) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.item} ${active === 1 && styles.active}`}>
                Корзина
            </div>
            <div className={styles.divider}>
            </div>
            <div className={`${styles.item} ${active === 2 && styles.active}`}>
                Оплата
            </div>
            <div className={styles.divider}>
            </div>
            <div className={`${styles.item} ${active === 3 && styles.active}`}>
                Завершение
            </div>
        </div>
    )
}

export default CartBreadcrumbs;