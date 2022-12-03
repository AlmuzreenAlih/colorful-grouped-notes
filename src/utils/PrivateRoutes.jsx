import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const PrivateRoutes = () => {
    const [Token, setToken] = useState(false);
    axios.get("http://localhost/cgapi/auth/auth.php").then(res=>{
        console.log(res.data);
        setToken(res.data);
    })
    let auth = { 'token': {Token}}
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes