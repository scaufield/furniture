import React, {ReactNode} from 'react'

interface IProps {
    title?: string,
    children: ReactNode,
}

const Helmet: React.FC<IProps> = props => {

    document.title = 'furniture. - ' + props.title

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <div>
            {props.children}
        </div>
    )
}

export default Helmet

