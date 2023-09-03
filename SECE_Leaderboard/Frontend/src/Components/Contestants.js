import React from 'react'
// import UserCard from './UserCard'
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from "../App";
import { useContext } from "react";
import { Loader } from './Loader';
const URL = "https://seceleaderboard2k22.onrender.com/users";
const URLdelete = "https://seceleaderboard2k22.onrender.com/deleteuser";

export default function Contestants() {
    const { state, dispatch } = useContext(UserContext)

    const fetchHandler = async () => {
        let data = await axios.get(URL);
        
        fetchData(data.data.users);

    }
    const [userdata, setuserdata] = useState();
    const fetchData = async (event) => {
        let handles = "";
        event.map((element) => {
            handles = handles + element.CFid + ";";
            return 0;
        })

        let url = `https://codeforces.com/api/user.info?handles=${handles}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        function compare(a, b) {
            if (a.rating < b.rating) {
                return 1;
            }
            if (a.rating > b.rating) {
                return -1;
            }
            return 0;
        }
        parsedData = parsedData.result;
        for(let x=0;x<parsedData.length;x++)
        {
            if(parsedData[x].rating==null)
            {
               parsedData[x].rating=0
            }
        }
        parsedData.sort(compare);
        setuserdata(parsedData)
        

    }

    useEffect(() => {
        
        fetchHandler();
        
    }, [userdata])


    let a = 1;



    function UserCard(props) {

        const handleRemove = async () => {
            if (state) {
                if (window.confirm("Remove Contestant?")===true) 
                {
                    alert("Contestant Removed")
                    
                    await axios.post(URLdelete, {
                        CFid: String(props.cfid),
                    });
                    await fetchHandler();
                }
                else{}
            }
            else {
                alert("LogIn is Required to Remove Contestant")
            }

        }
        let toaccount="https://codeforces.com/profile/"+props.cfid;
        console.log(props);
        return (
            <>

                <td>{props.rank}</td>
                <td><b><a href={toaccount} target="_blank" rel="noreferrer">{props.cfid}{props.firstName?" ("+props.firstName+")":""}</a></b></td>
                <td>{props.rating}</td>
                <td>{props.maxrating}</td>
                <td>{props.position}</td>
                <td>{props.maxposition}</td>
                <td><button className="btn card_btn contestant" onClick={handleRemove}>Remove</button></td>


            </>
        )
    }

   let space="   .  ";


    return (
        userdata?
        <div className="m-4 scrollmenu">
            
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>&nbsp;&nbsp;&nbsp;CodeForces ID</th>
                        <th>Current Rating</th>
                        <th>Highest Rating</th>
                        <th>Current Rank</th>
                        <th>Highest Rank</th>
                        <th> </th>

                    </tr>
                </thead>

                <tbody >
                    {userdata.map((element) => {


                        return (
                            <tr>

                                <UserCard key={a} rank={a++} firstName={element.firstName} lastName={element.lastName} cfid={element.handle} rating={element.rating} maxrating={element.maxRating} position={element.rank} maxposition={element.maxRank} />


                            </tr>

                        );



                    })}

                </tbody>
            </table>


        </div>:<Loader/>
    );
}
