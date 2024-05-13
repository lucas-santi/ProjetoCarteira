import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Carteira from './components/Carteira/Carteira'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element: <div><Login/></div>
  },
  {
    path:'/register',
    element: <div><Register/></div>
  },
  {
    path:'/carteira',
    element: <div><Carteira/></div>
  }
])


function App() {
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
