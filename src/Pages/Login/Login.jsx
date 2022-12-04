import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import './Login.scss'
// window.location.replace('http://auth.w3schools.com');

import InputBlock from './InputBlock'
import { Link } from 'react-router-dom'

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
            then(response => {
                console.log(response.data);
                if (response.data == true) {
                    window.location.replace('/');
                }
                else {
                    console.log("Login error");
                }
            });
    }
    return (
        <span className="MainPanel">
            
            <img src="src\assets\img\316243177_854245752381535_6906148811205586753_n.jpg" alt="" />
            <form className="LoginForm" method="post">
                <h1>Login</h1>
                <InputBlock name="email" changed={changedFunction} 
                            pattern="^[A-Za-z0-9]{3,16}$" value="admin@gmail.com" label="Email" />
                <InputBlock name="password" changed={changedFunction} value="admin" label="Password" />
                <button type="button" onClick={SubmittedFunction}>Submit</button>
                <Link>Register here</Link>
            </form>
        </span>
    )
}


export default LoginPage
