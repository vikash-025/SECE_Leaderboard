import React from 'react'

export default function ScoreCard (props) {
    let toaccount="https://codeforces.com/profile/"+props.cfid;
        
    return (
        <>
            <tr>
                <td>{props.slno}</td>
                <td><b><a href={toaccount} target="_blank" rel="noreferrer">{props.cfid}</a></b></td>
                <td>{props.rank}</td>
                <td>{props.points}</td>
            </tr>
        </>
    )
}
