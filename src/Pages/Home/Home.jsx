import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function HomePage() {
    const [count, setCount] = useState(0)
    return (
        <p>Home</p>
    )
}

export default HomePage