import React from 'react'
import img from '../assets/codeforces.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from "../App";
import { useContext } from "react";
import { Loader } from './Loader';
const URL = "https://seceleaderboard2k22.onrender.com/contests";
const URLdelete = "https://seceleaderboard2k22.onrender.com/deletecontest";

export default function Contests() {
    const { state, dispatch } = useContext(UserContext)
    const fetchHandler = async () => {
        let data = await axios.get(URL).then((res) => res.data);
        return data;
    }
    const [contest, setcontest] = useState([])
    useEffect(() => {
        fetchHandler().then(data => {
            setcontest(data.contests);
        });

    }, [contest])



    function ContestCards(props) {
        let contestLink = "https://codeforces.com/contest/" + props.contestid;

        const handleRemove = async () => {
            if (state) {
                if (window.confirm("Remove Contest?") === true) {
                    alert("Contest Removed")

                    await axios.post(URLdelete, {
                        contestid: String(props.contestid),
                    });
                    await fetchHandler();
                }
                else { }
            }
            else {
                alert("LogIn is Required to Remove Contest")
            }
        }


        return (

            <div class="card">
                <div class="card_image"><img src={props.image} /></div>
                <div class="card_content">
                    <h2 class="card_title">CodeForces Round {props.contestid}</h2>
                    <p class="card_text"></p>
                    <button class="btn card_btn"><a href={contestLink} target="_blank" rel="noreferrer">View Problems</a></button>
                    <button class="btn card_btn"><Link to={{ pathname: `/table/${props.contestid}` }}>Points Table</Link></button>
                    <button class="btn card_btn" onClick={handleRemove}>Remove Contest</button>
                </div>
            </div>

        )
    }


    return (
        contest.length?
        <div class="main">
            <ul class="cards">
                {contest.map((element) => {

                    return (
                        <li class="cards_item">
                            <ContestCards image={img} contestid={element.contestNumber} />
                        </li>
                    )
                })}
            </ul>
        </div>:<Loader/>
    )
}
