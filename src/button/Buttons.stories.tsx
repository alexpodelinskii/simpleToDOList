import Button, {ButtonPropsType} from "./Buttons.tsx";

export const  ButtonComp = (props: ButtonPropsType) => {

    return (
        <button onClick={props.onClick} disabled={props.disabled} className={props.classes}>{props.title}</button>
    )
}

export default Button;