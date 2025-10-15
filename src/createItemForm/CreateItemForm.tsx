import {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";



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

            <TextField
                label={'Enter a title'}
                variant={'outlined'}
                error={error}
                helperText={error?errorText:''}
                value={itemValue}
                size={'small'}
                onChange={inputOnChangeHandler}
                onKeyDown={inputOnKeyDownHandler}
                style={{'maxWidth':'200px'}}
            />

            <Button variant={'contained'} onClick={buttonOnClickHandler}
                    disabled={!isOkValue(itemValue)}>+</Button>

        </div>
    );
};

export default CreateItemForm;