import React from 'react'
import ScoreCard from './ScoreCard'
import { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader } from './Loader';
const URL = "https://seceleaderboard2k22.onrender.com/users";
let handles = "";
export default function SingleContestTable() {
    const fetchHandler = async () => {
        let data = await axios.get(URL).then((res) => res.data);
        return data;
    }
    const [userdata, setuserdata] = useState([]);
    let parsedData = [];
    let { contestid } = useParams();
    const fetchData = async (event) => {
        event.map((element) => {
            handles = handles + element.CFid + ";";
            return 0;
        })
        
        let url = `https://codeforces.com/api/contest.standings?contestId=${contestid}&handles=${handles}`;
        let data = await fetch(url);
        parsedData = await data.json();
        parsedData = parsedData.result.rows;
        function compare(a, b) {
            if (a.rank < b.rank) {
                return -1;
            }
            if (a.rank > b.rank) {
                return 1;
            }
            return 0;
        }
        parsedData.sort(compare);
        setuserdata(parsedData);

    }


    useEffect(() => {
        fetchHandler().then(data => {
            fetchData(data.users);
        });

    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    let points=[];
    let point=0;
    const getpoints = ((rank) => {

        if (rank <= 1000)
          point = 10;
        else if (rank <= 2000)
          point = 9;
        else if (rank <= 3000)
          point = 8;
        else if (rank <= 5000)
          point = 7;
        else if (rank <= 7500)
          point = 6;
        else if (rank <= 10000)
          point = 5;
        else
          point = 3;
      })
      
    for(let i=0;i<userdata.length;i++)
    {
        console.log(userdata[i].party.members[0]);
        console.log(userdata[i].rank)
        getpoints(userdata[i].rank);
        points.push(point);
    }
     
    let a = 1;
    return (
        userdata.length?
        <div className="m-4 scrollmenu">
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>&nbsp;&nbsp;&nbsp;CodeForcesID</th>
                        <th>Rank</th>
                        <th>Points Scored</th>
                    </tr>
                </thead>
                <tbody>

                    {userdata.map((element) => {
                       
                        return (
                            <ScoreCard slno={a++} cfid={element.party.members[0].handle} rank={element.rank} points={points[a-2]} />
                        );

                    })}

                </tbody>
            </table>


        </div>:<Loader/>
    );
}
