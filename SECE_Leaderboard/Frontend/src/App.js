import './App.css';
import Contestants from './Components/Contestants';
import Contests from './Components/Contests';
import Navbar from './Components/Navbar';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import AddContest from './Components/AddContest';
import AddContestant from './Components/AddContestant';
import ScoreBoard from './Components/ScoreBoard';
import LoginPage from './Components/LoginPage';
import React,{ createContext } from 'react';
import { useReducer } from 'react';
import { initialState } from './Reducer/UseReducer';
import { Reducer } from 'react';
import { reducer } from './Reducer/UseReducer';
import LogOutPage from './Components/LogOutPage';
import { decodeToken, useJwt } from 'react-jwt';
import SingleContestTable from './Components/SingleContestTable';
import { Loader } from './Components/Loader';
export const UserContext=createContext();
const auth=localStorage.getItem("token");
const valid=decodeToken(auth)
const App=()=> {
  
  const [state, dispatch] = useReducer(reducer,valid?1:0)
  return (
    <>
  <UserContext.Provider value={{state,dispatch}}>

      <BrowserRouter>
      <Navbar />
      
      <Routes >
          <Route exact path="/contestants" element={<Contestants/>} />
          <Route exact path="/contests" element={<Contests />} />
          <Route exact path="/" element={<Contests />} />
          <Route exact path="/addcontest" element={<AddContest />} />
          <Route exact path="/addcontestant" element={<AddContestant/>} />
          <Route exact path="table/:contestid" element={<SingleContestTable/>} />
          <Route exact path="/scoreboard" element={<ScoreBoard/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/logout" element={<LogOutPage/>} />
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>
    </>
  );
}

export default App;
