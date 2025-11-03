import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    changeValue: (value:string)=>void
}

const EditableSpan = ({value, changeValue}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        changeValue(title)
    }

    const inputOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    function inputOnKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            turnOffEditMode()
        }
    }
    return (
        <>
            {isEditMode ? (
                <TextField
                    variant={'outlined'}
                    size={'small'}
                    value={title}
                    autoFocus
                    onBlur={turnOffEditMode}
                    onChange={inputOnChangeHandler}
                    onKeyDown={inputOnKeyDownHandler}/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}
export default EditableSpan;