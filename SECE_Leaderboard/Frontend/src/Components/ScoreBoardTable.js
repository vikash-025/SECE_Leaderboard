import React from 'react'

export default function ScoreBoardTable (props) {
  let toaccount="https://codeforces.com/profile/"+props.e.CFid;
    // console.log(props)
    return (
        <>
            <tr>
            <td><b>{props.pos}</b></td>
            <td><b><a href={toaccount} target="_blank" rel="noreferrer">{props.e.CFid} ({props.e.name})</a></b></td>
            <td><b>{props.e.TotalScore}</b></td>
            {
              props.e.temp.map((element) => {
                
                return (
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{element}</td>
                )
              })
            }
            </tr>
        </>
    )
}
