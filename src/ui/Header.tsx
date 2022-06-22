import React, {useRef, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useUserStorage} from "../services/storageAdapter";
import {useSelector} from "react-redux";
import productData from "../assets/fake-data/products";

const mainNav = [
    {
        display: "Главная",
        path: "/"
    },
    {
        display: "Каталог",
        path: "/catalog"
    }
]

const Header: React.FC = () => {

    const {pathname} = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    const {user} = useUserStorage();
    const [totalProducts, setTotalProducts] = useState(0)


    // @ts-ignore
    const cartItems = useSelector((state) => state.cartItems.value)

    const headerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])

    useEffect(() => {
        const bodyScrollListener = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef?.current?.classList.add('shrink')
            } else {
                headerRef?.current?.classList.remove('shrink')
            }
        }
        window.addEventListener("scroll", bodyScrollListener)
        return () => {
            window.removeEventListener("scroll", bodyScrollListener)
        };
    }, []);

    const menuLeft = useRef<HTMLDivElement>(null)

    const menuToggle = () => menuLeft?.current?.classList.toggle('active')

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        furniture.
                        {/*<img src={logo} alt="" />*/}
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        {/*                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>*/}
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                            <div className="item-total-products">{totalProducts}</div>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            {!user ? (
                                <Link to="/auth"> <i className="bx bx-user"></i></Link>) : (
                                <Link to="/user" className="header__menu__item item-user">
                                    {user.name}
                                    {/*({cart.products.length})*/}
                                </Link>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
