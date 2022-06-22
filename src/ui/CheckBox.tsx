import React from 'react'

interface IProps {
    label: string,
    checked: boolean,
    onChange: any;
}

const CheckBox: React.FC<IProps> = props => {

    const inputRef = React.useRef(null)

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked}/>
            <span className="custom-checkbox__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {props.label}
        </label>
    )
}


export default CheckBox
