import React from 'react'
import './InputBlock.scss'

const InputBlock = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input {...props} />
        </div>
    )
}

export default InputBlock