import React, {useState, useRef, useEffect, ReactNode} from 'react'

import {useDispatch} from 'react-redux'
import {updateItem, removeItem} from '../services/redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../lib/numberWithCommas'
import {Link} from 'react-router-dom'
import {TCart} from "../domain/cart";

interface IProps {
    item: any,
    isDisabled: boolean;
}

const CartItem: React.FC<IProps> = props => {

    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)

    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    const updateQuantity = (opt: string) => {
        if (opt === '+') {
            dispatch(updateItem({...item, quantity: quantity + 1}))
        }
        if (opt === '-') {
            dispatch(updateItem({...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1}))
        }
    }

    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    const removeCartItem = () => {
        dispatch(removeItem(item))
    }

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.product?.image01} alt=""/>
            </div>
            <div className="cart__item__info_left">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item.product?.title} - ${item.color} - ${item.material}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(item.price)}
                </div>
            </div>

            <div className="cart__item__info_right">
                {props.isDisabled &&
                    (
                        <>
                            <div className="cart__item__del">
                                <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                            </div>
                            <div className="cart__item__info__quantity">
                                <div className="product__info__item__quantity">
                                    <div className="product__info__item__quantity__btn"
                                         onClick={() => updateQuantity('-')}>
                                        <i className="bx bx-minus"></i>
                                    </div>
                                    <div className="product__info__item__quantity__input">
                                        {quantity}
                                    </div>
                                    <div className="product__info__item__quantity__btn"
                                         onClick={() => updateQuantity('+')}>
                                        <i className="bx bx-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default CartItem
