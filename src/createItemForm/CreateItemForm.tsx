import {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "../button/Buttons.tsx";

type CreateItemFormPropsType = {
    addItem: (value:string) => void
    isOkValue: (value: string) => boolean
    errorText: string
}


const CreateItemForm = ({addItem, isOkValue, errorText}: CreateItemFormPropsType) => {

    const [itemValue, setItemValue] = useState('')
    const [error, setError]= useState(false)

    function inputOnKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && isOkValue(itemValue)) {
            setItemValue('')
            addItem(itemValue)

        }
    }

    function inputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setItemValue(event.currentTarget.value)
        setError(!isOkValue(event.currentTarget.value))
    }

    function buttonOnClickHandler (){
        setItemValue('')
        addItem(itemValue)

    }

    return (<div>
            <input
                value={itemValue}
                onChange={inputOnChangeHandler}
                onKeyDown={inputOnKeyDownHandler}
            />
            <Button title={'+'} onClick={buttonOnClickHandler}
                    disabled={!isOkValue(itemValue)}/>
            {error&&<div className={'newValueInputError'}>
                {!isOkValue(itemValue) && errorText}
            </div>}
        </div>
    );
};

export default CreateItemForm;