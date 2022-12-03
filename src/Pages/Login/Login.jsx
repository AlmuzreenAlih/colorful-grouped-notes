import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

// window.location.replace('http://auth.w3schools.com');

import InputBlock from './InputBlock'

function LoginPage() {
    console.log("refreshed")
    const [values, setValues] = useState({
        Username: "",
        Password: "",
      });
    
    const [Table, setTable] = useState("TableContents");
    
    const changedFunction = (e) => {
        if (e.target.value.slice(-1) == " ") {
            e.target.value = e.target.value.replace(/\s/g, "");
        }
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    
    const SubmittedFunction = () => {
        axios.post("http://192.168.100.2:80/cgapi/auth/login.php",{
                email: document.querySelector("#email").value, 
                password: document.querySelector("#password").value}
            ).
            then(res=>{
                console.log(res.data);
                if (res.data == true) {
                    window.location.replace('/');
                }
                else {
                    console.log("Login error");
                }
            });
    }
    return (
        <form method="post">
            <h1>Login</h1>
            <InputBlock name="email" changed={changedFunction} 
                        pattern="^[A-Za-z0-9]{3,16}$" value="admin@gmail.com" />
            <InputBlock name="password" changed={changedFunction} value="admin" />
            <button type="button" onClick={SubmittedFunction}>{Table}</button>
        </form>

    )
}


export default LoginPage
