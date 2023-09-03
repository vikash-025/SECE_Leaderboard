import { json, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { decodeToken, isExpired, useJwt } from "react-jwt";
import { UserContext } from "../App";
import { useContext } from "react";
function Navbar() {

    const { state, dispatch } = useContext(UserContext)

    const ToggleMe = () => {
        if (state) {
            return (<li className="nav-item">
                <Link className="nav-link" to="/logout">Log Out</Link>
            </li>
            )
        }
        else {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Log In</Link>
                </li>
            )
        }
    }





    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/contests">SECE Leaderboard</Link>
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/contests">Contests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contestants">Contestants</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addcontest">Add Contest</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addcontestant">Add Contestant</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/scoreboard">ScoreBoard</Link>
                        </li>
                        <ToggleMe />
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Navbar