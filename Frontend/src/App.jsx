import { useState } from 'react'
import Navbar from  "./components/Comman/Navbar.jsx"
import BoardCard from './components/board/BoardCard';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import ListCard from './components/list/ListCard';
import ListContainer from './components/list/ListContainer';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import { Outlet } from 'react-router-dom';
import Register from './pages/Register.jsx';

//login
import { getCurrentUser } from './Thunks/authThunks.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCurrentUser());
  },[dispatch])

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
