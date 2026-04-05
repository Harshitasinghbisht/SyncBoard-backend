import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Board from './pages/Board.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from "./pages/Home.jsx"
import ListContainer from './components/ListContainer.jsx'

const router= createBrowserRouter([
  {path:"/",
    element:<App/>,
    children:[
      {
       path:"/",
       element:<Home/>
      },
      {
        path:"/Dashboard",
        element:<Dashboard/>
      },
      {
        path:"/Board",
        element:<Board/>
      },
      {
        path:"/List",
        element:<ListContainer/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
