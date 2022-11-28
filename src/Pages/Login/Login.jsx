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
        axios.get("http://localhost/cgapi/getnotes.php").then(res=>setTable(res.data))
    }
    return (
        <form>
            <h1>Login</h1>
            <InputBlock name="Username" changed={changedFunction} 
                        pattern="^[A-Za-z0-9]{3,16}$"/>
            <InputBlock name="Password" changed={changedFunction}/>
            <button type="button" onClick={SubmittedFunction}>d{Table}</button>
        </form>

    )
}


export default LoginPage
