export type ButtonPropsType = {
    title: string
    onClick: () => void
    disabled?: boolean
    classes?:string
}

const Button = (props: ButtonPropsType) => {

    return (
        <button onClick={props.onClick} disabled={props.disabled} className={props.classes}>{props.title}</button>
    )
}

export default Button;