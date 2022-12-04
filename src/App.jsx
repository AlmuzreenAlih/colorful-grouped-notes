import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./utils/PrivateRoutes"
import AboutPage from './Pages/About/About'
import LoginPage from './Pages/Login/Login'
import HomePage from './Pages/Home/Home'
import MainLayout from './Layouts/MainLayout'

function App() {
    const [count, setCount] = useState(0)
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/about' element={<AboutPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                </Route>
            </Routes>
            {/* <div>
            
                {
                    [1,2,3,4].map(el => <p> {el} </p>)
                  }
            
            </div> */}
        </Router>
    )
}

export default App
