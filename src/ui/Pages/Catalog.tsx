import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../Helmet'
import CheckBox from '../CheckBox'

import productData from '../../assets/fake-data/products'
import category from '../../assets/fake-data/category'
import colors from '../../assets/fake-data/product-color'
import material from '../../assets/fake-data/product-material'
import Button from '../Button'
import InfinityList from '../InfinityList'

const Catalog = () => {

    const initFilter = {
        category: [],
        color: [],
        material: []
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case "MATERIAL":
                    setFilter({...filter, material: [...filter.material, item.material]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "MATERIAL":
                    const newMaterial = filter.material.filter(e => e !== item.material)
                    setFilter({...filter, material: newMaterial})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                // @ts-ignore
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    // @ts-ignore
                    const check = e.colors.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.material.length > 0) {
                temp = temp.filter(e => {
                    // @ts-ignore
                    const check = e.material.find(material => filter.material.includes(material))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef<HTMLDivElement>(null)

    const showHideFilter = () => filterRef.current?.classList.toggle('active')

    return (
        <Helmet title="Каталог">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__title">Каталог</div>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Категория
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Цвет
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Материал
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                material.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("MATERIAL", input.checked, item)}
                                            checked={filter.material.includes(item.material)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>Удалить фильтр</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>Фильтр</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        // @ts-ignore
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
