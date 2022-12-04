import React from 'react'
import './InputBlock.scss'

const InputBlock = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input id={props.name} name={props.name} onChange={props.changed} pattern={props.pattern} value={props.value} />
        </div>
    )
}

export default InputBlock