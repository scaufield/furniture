import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router'

import {useDispatch} from 'react-redux'

import {addItem} from '../services/redux/shopping-cart/cartItemsSlide'
import {remove} from '../services/redux/product-modal/productModalSlice'

import Button from './Button'
import numberWithCommas from '../lib/numberWithCommas'

const ProductView = props => {

    const dispatch = useDispatch()

    let product = props.product

    if (product === undefined) product = {
        title: "",
        price: '',
        image01: null,
        image02: null,
        categorySlug: "",
        colors: [],
        slug: "",
        material: [],
        description: ""
    }

    const [previewImg, setPreviewImg] = useState(product.image01)

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [color, setColor] = useState(undefined)

    const [material, setmaterial] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product.image01)
        setQuantity(1)
        setColor(undefined)
        setmaterial(undefined)
    }, [product])

    const check = () => {
        if (color === undefined) {
            alert('Пожалуйста, выберите цвет!')
            return false
        }

        if (material === undefined) {
            alert('Пожалуйста, выберите материал!')
            return false
        }

        return true
    }

    const addToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                color: color,
                material: material,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                alert('Добавлено')
            } else {
                alert('Fail')
            }
        }
    }

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                color: color,
                material: material,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                props.history.push('/cart')
            } else {
                alert('Не получилось(')
            }
        }
    }

    return (
        <>
            <div className="product">
                <div className="product__images">
                    <div className="product__images__list">
                        <div className="product__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                            <img src={product.image01} alt=""/>
                        </div>
                        <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                            <img src={product.image02} alt=""/>
                        </div>
                    </div>
                    <div className="product__images__main">
                        <img src={previewImg} alt=""/>
                    </div>
                </div>
                <div className="product__info">
                    <div className="product__info-main">
                        <div className="product__info__container">
                            <h1 className="product__info__title">{product.title}</h1>
                            <div className="product__info__item">
                            <span className="product__info__item__price">
                                {numberWithCommas(product.price)}
                            </span>
                            </div>
                        </div>
                        {
                            product.ar ?
                                (<a href={product.ar} className="product-card__ar ">
                                    <i className="bx bx-cube-alt"></i>
                                </a>)
                                :
                                ""
                        }
                    </div>
                    <div className="product__info-secondary">
                        <div className="product__info__item">
                            <div className="product__info__item__list">
                                {
                                    product.colors.map((item, index) => (
                                        <div key={index}
                                             className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                             onClick={() => setColor(item)}>
                                            <div className={`circle bg-${item}`}></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="product__info__item">
                            <div className="product__info__item__list">
                                {
                                    product.material.map((item, index) => (
                                        <div key={index}
                                             className={`product__info__item__list__item ${material === item ? 'active' : ''}`}
                                             onClick={() => setmaterial(item)}>
                                    <span className="product__info__item__list__item__material">
                                        {item}
                                    </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="product__info__item">
                            <div className="product__info__item__quantity">
                                <div className="product__info__item__quantity__btn"
                                     onClick={() => updateQuantity('minus')}>
                                    <i className="bx bx-minus"></i>
                                </div>
                                <div className="product__info__item__quantity__input">
                                    {quantity}
                                </div>
                                <div className="product__info__item__quantity__btn"
                                     onClick={() => updateQuantity('plus')}>
                                    <i className="bx bx-plus"></i>
                                </div>
                            </div>
                        </div>
                        <div className="product__info__item__btns">
                            <Button backgroundColor="white" onClick={() => addToCart()}>Добавить в корзину</Button>
                            <Button onClick={() => goToCart()}>Купить сейчас</Button>
                        </div>
                    </div>
                </div>
                <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Информация о продукте
                    </div>
                    <div className="product-description__content"
                         dangerouslySetInnerHTML={{__html: product.description}}></div>
                    {/* <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Развернуть' : 'Свернуть'
                        }
                    </Button>
                </div>*/}
                </div>
            </div>
            <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Информация о продукте
                </div>
                <div className="product-description__content"
                     dangerouslySetInnerHTML={{__html: product.description}}></div>

            </div>
        </>
    )
}

export default withRouter(ProductView)
