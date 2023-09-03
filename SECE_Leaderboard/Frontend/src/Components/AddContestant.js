import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { UserContext } from "../App";
import { useContext } from "react";
let url="https://seceleaderboard2k22.onrender.com/adduser";

export default function AddContestant() {
  const {state,dispatch} = useContext(UserContext)
  const [name, setname] = useState()
  const [cfid, setcfid] = useState()
  

  const changeName=(event)=>{
    setname(event.target.value);
  }
  const changeCfid=(event)=>{
    setcfid(event.target.value);
  }
  // const changeCcid=(event)=>{
  //   setccid(event.target.value);
  // }
  const sendRequest=async()=>
  {
    if(name=="")
    {
       alert("Enter name!!");
       return;
       
    }

    if(state)
    {
    let cfurl=`https://codeforces.com/api/user.info?handles=${cfid}`;
    let data=await fetch(cfurl);
    let parsedData = await data.json();
    if(parsedData.status!=="FAILED")
    {
    await axios.post(url,{
      name:String(name),
      CFid:String(cfid),
      // CCid:String(ccid)
    });
    alert("Participant Added Successfully");
  }
  else {
    alert("Enter Correct CodeForces ID");
  }
}
else
{
  alert("LogIn is Required to Add Contestant");
}
  }
  const handleClick=(event)=>{
    event.preventDefault();
    
    sendRequest();
  }
  return (
    <div className="signup-form">
    <form>
		<h2>Add Contestant</h2>
		<hr/>
        <div className="form-group">
        	<input type="text" className="form-control" value={name} onChange={changeName} placeholder="Name" required="required"/>
        </div>
        <div className="form-group">
        	<input type="text" className="form-control" value={cfid} onChange={changeCfid} placeholder="CodeForces ID" required="required"/>
        </div>
		{/* <div className="form-group">
            <input type="text" className="form-control" value={ccid} onChange={changeCcid} placeholder="CodeChef ID" required="required"/>
        </div> */}
		<div className="form-group">
            <button onClick={handleClick}className="btn btn-primary btn-block btn-lg">Add</button>
        </div>
		</form>
</div>

  )
}
