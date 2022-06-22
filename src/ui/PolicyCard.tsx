import React from 'react'

interface IProps {
    name: string,
    description: string,
    icon: string,
}

const PolicyCard: React.FC<IProps>  = props => {
    return (
        <div className="policy-card">
            <div className="policy-card__icon">
                <i className={props.icon}></i>
            </div>
            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    {props.name}
                </div>
                <div className="policy-card__info__description">
                    {props.description}
                </div>
            </div>
        </div>
    )
}

export default PolicyCard
