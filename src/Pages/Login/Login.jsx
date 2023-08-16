import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import './Login.scss'
import Cookies from 'universal-cookie';

import InputBlock from './InputBlock'
import { Link } from 'react-router-dom'

function LoginPage() {
    console.log("refreshed")
    //TO DO: Transfer this to your register page
    // const [values, setValues] = useState({
    //     Username: "",
    //     Password: "",
    //   });
    
    // const changedFunction = (e) => {
    //     if (e.target.value.slice(-1) == " ") {
    //         e.target.value = e.target.value.replace(/\s/g, "");
    //     }
    //     setValues({ ...values, [e.target.name]: e.target.value });
    //   };

    const [ShowProgress, setShowProgress] = useState("hidden");
    const [data, setData] = useState(null);
    
    const [inputValues, setInputValues] = useState({
        email: "admin@gmail.co",
        password: "admin",
    });

    function inputChanged(e) {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
        console.log(inputValues.email)

    }

    const SubmittedFunction = () => {
        console.log(inputValues.email)

        setShowProgress("");
        axios.post("http://localhost/cgapi/auth/login.php",{
                email: inputValues.email,
                password: inputValues.password,}
            ).
            then(response => {
                setShowProgress("hidden");
                if (response.data == false) {
                    alert("Incorrect");
                }
                else {
                    alert(response.data);
                    const cookies = new Cookies();
                    cookies.set('TokenSaved', response.data, { path: '/' });
                    window.location.replace('/');
                }
            });
    }

    return (
        <div>
            <span className={"DialogBox " + ShowProgress}>
                <svg viewBox="0 0 100 100">
                    <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
                        floodColor="#fc6767"/>
                    </filter>
                    </defs>
                    <circle id="spinner" style={{fill:"transparent",stroke:"#dd2476",strokeWidth: "7px",strokeLinecap: "round",filter:"url(#shadow)"}} cx="50" cy="50" r="45"/>
                </svg>
                <div className="loggingin">Logging in...</div>            
            </span>

            <span className="MainPanel">
                <img src="src\assets\img\316243177_854245752381535_6906148811205586753_n.jpg" alt="" />
                <form className="LoginForm" method="post">
                    <h1>Login</h1>
                    <InputBlock name="email" pattern="^[A-Za-z0-9]{3,16}$" 
                                value={inputValues.email} label="Email" changed={inputChanged} />
                    <InputBlock name="password" 
                                value={inputValues.password} label="Password" changed={inputChanged} />
                    <button type="button" onClick={SubmittedFunction}>Submit</button>
                    <Link>Register here</Link>
                </form>
            </span>
        </div>
    )
}


export default LoginPage
