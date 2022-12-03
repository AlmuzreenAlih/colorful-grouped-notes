import React from 'react'
import './InputBlock.css'

const InputBlock = (props) => {
    return (
        <div>
            <label>{props.name}</label>
            <input id={props.name} name={props.name} onChange={props.changed} pattern={props.pattern} value={props.value} />
        </div>
    )
}

export default InputBlock