import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { UserContext } from "../App";
import { useContext } from "react";
let url="https://seceleaderboard2k22.onrender.com/addcontest";
let URL="https://seceleaderboard2k22.onrender.com/users";


export default function AddContest() {
  const {state,dispatch} = useContext(UserContext)

  const [cfno, setcfno] = useState()
  // const [ccid, setccid] = useState()

 
  const changeCfno=(event)=>{
    setcfno(event.target.value);
  }
  // const changeCcid=(event)=>{
  //   setccid(event.target.value);
  // }
  let datahandle=[];
  const fetchHandler = async () => {
     datahandle = await axios.get(URL).then((res) => res.data);
}
const [userdata, setuserdata] = useState([]);
let parsedData = [];
const fetchData = async () => {
    let handles="";
    datahandle.users.map((element) => {
        handles = handles + element.CFid + ";";
        return 0;
    })
    let url = `https://codeforces.com/api/contest.standings?contestId=${cfno}&handles=${handles}`;
    let data = await fetch(url);
    parsedData = await data.json();
    parsedData = parsedData.result.rows;

}


  const sendRequest=async()=>
  {
    if(state)
    {
    let cfurl=`https://codeforces.com/api/contest.ratingChanges?contestId=${cfno}`;
    let data=await fetch(cfurl);
    let parsedDataC = await data.json();
    if(parsedDataC.status!=="FAILED")
    {
      await fetchHandler();
      await fetchData();
      
      await axios.post(url,{
      contestNumber:String(cfno),
      details:Array(parsedData)
      // CCid:String(ccid)
    });
    alert("Contest Added Successfully");
  }
  else {
    alert("Enter Correct Contest Number");
  }
}
else
{
  alert("LogIn is Required to Add Contest");
}
  }
  const handleClick=(event)=>{
    event.preventDefault();
    
    sendRequest();
  }
  return (
    <div className="signup-form">
    <form>
		<h2>Add Contest</h2>
		<hr/>
        <div className="form-group">
        	<input type="text" className="form-control" value="CodeForces" required="required"/>
        </div>
        <div className="form-group">
        	<input type="text" className="form-control" value={cfno} onChange={changeCfno} placeholder="CodeForces ID" required="required"/>
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
