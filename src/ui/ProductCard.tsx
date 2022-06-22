import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Button from './Button'
import numberWithCommas from '../lib/numberWithCommas'
import {TProduct} from "../domain/product";
import {set} from "../services/redux/product-modal/productModalSlice";

interface IProductProps {
    product: TProduct;
}

const ProductCard = ({product}: IProductProps) => {
    // const {addToCart} = useAddToCart();
    // const {user} = useUserStorage();
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <Link to={`/catalog/${product.slug}`}>
                <div className="product-card__image">
                    <img src={product.image01} alt=""/>
                    <img src={product.image02} alt=""/>
                </div>
            </Link>
            <div>
                <Link to={`/catalog/${product.slug}`} className="product-card__content">
                    <div className="product-card__category">{product.categorySlug}</div>
                    <h3 className="product-card__name">{product.title}</h3>
                    <div className="product-card__price">
                        {numberWithCommas(Number(product.price))}
                        <span className="product-card__price__old">
                    </span>
                    </div>
                </Link>
                <div className="product-card__btns">
                    <Button
                        size="sm"
                        icon="bx bx-cart"
                        animate={true}
                        // onClick={() => addToCart(user, product)}
                        onClick={() => dispatch(set(product.slug))}
                    >
                        В корзину
                    </Button>
                    {
                        product.ar ?
                            (<a href={product.ar} className="product-card__ar">
                                <i className="bx bx-cube-alt"></i>
                            </a>)
                            :
                            ""
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductCard
