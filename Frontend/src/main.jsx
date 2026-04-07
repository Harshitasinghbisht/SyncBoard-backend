import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Board from './pages/Board.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from "./pages/Home.jsx"
import ListContainer from './components/list/ListContainer.jsx'
import LogoutBtn from './components/Comman/LogoutBtn.jsx'
import Theme from './components/Comman/Theme.jsx'

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
        path:"/Logout",
        element:<LogoutBtn/>
      },
      {
        path:"/Theme",
        element:<Theme/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
