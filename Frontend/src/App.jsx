import { useState } from 'react'
import Navbar from './components/Navbar'
import BoardCard from './components/BoardCard';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import ListCard from './components/ListCard';
import ListContainer from './components/ListContainer';
import Home from './pages/Home';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
