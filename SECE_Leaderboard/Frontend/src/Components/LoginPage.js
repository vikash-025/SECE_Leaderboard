import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
export default function LoginPage() {
    const {state,dispatch} = useContext(UserContext)
    let url = "https://seceleaderboard2k22.onrender.com/login";

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
   
    if(state)
    {}
    const changeemail = (event) => {
        setemail(event.target.value);
    }
    const changepassword = (event) => {
        setpassword(event.target.value);
    }
    const sendRequest = (async () => {

        const data = await axios.post(url, {

            email: String(email),
            password: String(password)

        });
        
        if (data.data !== false) {
            localStorage.setItem("token",data.data)
            dispatch({type:"USER",payload:1})
            alert("Auth Success");
            setflag(true);
        }
        else {
            alert("Enter correct Email or Password");
        }


    });









    const handleClick = (event) => {
        event.preventDefault();
        sendRequest();
    }
    const [flag, setflag] = useState(false);

    return (

        <div className="signup-form">
            {flag && (
                <Navigate to="/" replace={true} />
            )}
            <form>
                <h2>Admin Log in</h2>
                <hr />
                <div className="form-group">
                    <input type="email" className="form-control" value={email} onChange={changeemail} placeholder="Email" required="required" autoComplete='false' />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={password} onChange={changepassword} placeholder="Password" required="required" />
                </div>
                {/* <div className="form-group">
            <input type="text" className="form-control" value={ccid} onChange={changeCcid} placeholder="CodeChef ID" required="required"/>
        </div> */}
                <div className="form-group">
                    <button onClick={handleClick} className="btn btn-primary btn-block btn-lg">Authenticate</button>
                </div>
            </form>
        </div>


    )
}
