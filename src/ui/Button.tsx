import React, { ReactNode} from 'react'

interface IProps {
    backgroundColor?: string,
    textColor?: string,
    size?:string,
    icon?: string,
    animate?: boolean,
    onClick?: any;
    children?: ReactNode;
    disabled?: boolean;
}

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}


const Button: React.FC<IProps & ButtonProps> = props => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main'

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''

    const textColor = props.textColor ? 'text-color-' + props.textColor : 'text-color-black'

    const isDisabled = props.disabled ? 'btn-disabled' : ''
    return (
        <button
            className={`btn ${bg} ${size} ${animate} ${isDisabled}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <span className={`btn__txt ${textColor}`}>{props.children}
                {props.icon && !props.animate ? (
                        <i className={`${props.icon}`}></i>
                ) : null}
            </span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`${props.icon} ${textColor} bx-tada`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

export default Button
