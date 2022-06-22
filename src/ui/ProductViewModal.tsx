import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductView'

import Button from './Button'

import { remove } from '../services/redux/product-modal/productModalSlice'

import productData from '../assets/fake-data/products'

const ProductViewModal = () => {

    // @ts-ignore
    const productSlug = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()

    const [product, setProduct] = useState(undefined)

    useEffect(() => {
        // @ts-ignore
        setProduct(productData.getProductBySlug(productSlug))
    }, [productSlug]);

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"    
                        onClick={() => dispatch(remove())}
                    >
                          Закрыть
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
