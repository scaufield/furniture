import React from 'react'
import Button from "./Button";
import {Link} from "react-router-dom";

interface IProps {
    onClick: () => void;
    totalProducts: number;
    isDisabled: boolean;
}

const CartButtons: React.FC<IProps> = ({onClick, totalProducts, isDisabled}) => {

    return (
        <>
            <div className="cart__info__txt">
                <p>
                    У вас товаров в корзине: {totalProducts}
                </p>
            </div>
            <div className="cart__info__btn">
                <Button onClick={onClick} size="block" disabled={isDisabled}>
                    Перейти к оформлению заказа
                </Button>
                <Link to="/catalog">
                    <Button backgroundColor="black" textColor="white" size="block">
                        Продолжить покупки
                    </Button>
                </Link>
            </div>
        </>
    )
}


export default CartButtons;