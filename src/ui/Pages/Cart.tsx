import React, {useEffect, useState} from 'react'

import {useSelector} from 'react-redux'

import Helmet from '../Helmet'
import CartItem from '../CartItem'
import logo from '../../assets/images/empty-cart.png';
import productData from '../../assets/fake-data/products'
import numberWithCommas from '../../lib/numberWithCommas'
import {Payment} from "../Payment";
import CartButtons from "../CartButtons";
import OrderFinish from "../OrderFinish/OrderFinish";
import CartBreadcrumbs from "../CartBreadcrumbs/CartBreadcrumbs";

const Cart = () => {

    // @ts-ignore
    const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    const [activeScreen, setActiveScreen] = useState(1)

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems))
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])


    const setNextScreen = () => {
        activeScreen < 3 && setActiveScreen(activeScreen + 1)
    }

    const setPreviousScreen = () => {
        activeScreen > 1 && setActiveScreen(activeScreen - 1)
    }

    const isCartProductInfoDisabled = activeScreen === 1;
    const price = numberWithCommas(Number(totalPrice));
    return (
        <Helmet title="Корзина">
            <div className="cart">
                <div className="cart__info">
                    <CartBreadcrumbs active={activeScreen}/>
                    <div className='cart-info__container'>
                        {activeScreen === 1 ?
                            <CartButtons onClick={setNextScreen} totalProducts={totalProducts}
                                         isDisabled={cartProducts.length === 0}/> : null}
                        {activeScreen === 2 ?
                            <Payment onClick={setNextScreen} onCancelClick={setPreviousScreen} totalPrice={price}
                                     cart={cartItems}/> : null}
                        {activeScreen === 3 ? <OrderFinish/> : null}
                    </div>
                </div>

                <div className="cart__list">
                    <div className="cart__info__txt__price">
                        <span>К оплате </span> <span>{price}</span>
                    </div>
                    {cartProducts.length !== 0 ?
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index} isDisabled={isCartProductInfoDisabled}/>
                        ))
                        :
                        <div className="empty-cart">
                            <div className="empty-cart__title">Товары доступны в каталоге</div>
                            <img src={logo} alt="logo" />
                        </div>
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
