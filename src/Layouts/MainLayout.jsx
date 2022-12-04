import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './MainLayout.scss'

function MainLayoutPage() {
    const [count, setCount] = useState(0)
    return (
        <div className="container">
            <Outlet />
        </div>
    )
}

export default MainLayoutPage