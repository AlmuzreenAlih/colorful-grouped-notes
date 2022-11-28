import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function AboutPage() {
    const [count, setCount] = useState(0)
    return (
        <p>About</p>
    )
}

export default AboutPage