import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'

interface IProps {
    data: Array<any>,
    control: boolean,
    auto: boolean,
    timeOut: number,
}

const HeroSlider: React.FC<IProps>  = props => {

    const data = props.data

    const timeOut = props.timeOut ? props.timeOut : 3000

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(
        () => {
            const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        },
        [activeSlide, data],
    )

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);
            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, props])

    return (
        <div className="hero-slider">

            {
                data.map((item, index) => (
                    <HeroSliderItem key={index} item={item} active={index === activeSlide}/>
                ))
            }
            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item">
                            <div className="index">
                                0{activeSlide + 1}/<span className="index_length">0{data.length}</span>
                            </div>
                        </div>
                        <div className="hero-slider__control-group">
                            <div className="hero-slider__control__item" onClick={nextSlide}>
                                <i className="bx bx-chevron-right"></i>
                            </div>
                            <div className="hero-slider__control__item" onClick={prevSlide}>
                                <i className="bx bx-chevron-left"></i>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}


const HeroSliderItem = props => (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title`}>
                <span>{props.item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className="hero-slider__item__info__btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate={true}
                    >
                        К каталогу
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slider__item__image">
            <img src={props.item.img} alt="" />
        </div>
    </div>
)

export default HeroSlider
