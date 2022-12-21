import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function FooterPart() {
    const [count, setCount] = useState(0)
    return (
        <p>Footer</p>
    )
}

export default FooterPart