import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

const footerAboutLinks = [
    {
        display: "О нас",
        path: "/about"
    },
    {
        display: "Контакты",
        path: "/about"
    },
    {
        display: "Новым клиентам",
        path: "/about"
    },
]

const footerCustomerLinks = [
    {
        display: "Политика возврата",
        path: "/about"
    },
    {
        display: "Гарантийная политика",
        path: "/about"
    },
    {
        display: "Партнераская программа",
        path: "/about"
    }
]


const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={3}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            О магазине
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Обслуживание клиентов
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">

                                <div className="footer__logo">furniture.</div>
                            </Link>
                        </p>
                        <p>
                            На пути к тому, чтобы каждый день приносить новую радость миллионам потребителей. Давайте работать с нами для более активной и позитивной жизни.                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
