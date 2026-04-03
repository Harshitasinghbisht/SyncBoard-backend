import { useState } from 'react'
import Navbar from './components/Navbar'
import BoardCard from './components/BoardCard';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import ListCard from './components/ListCard';
import ListContainer from './components/ListContainer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Board/>
    </>
  )
}

export default App
