import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
// import React from 'react'

export default function LogOutPage() {
    const {state,dispatch} = useContext(UserContext)
    dispatch({type:"USER",payload:0})
    localStorage.clear();
    const navigate = useNavigate();
    navigate(-1);

  return (
    <></>
   // <Navigate to="/" replace={true} />
  )
}