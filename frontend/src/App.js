//Mario Matas Martin
import React from 'react'
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import Informes from './components/Informes'
import GesUser from './components/GesUser'
import Prestamos from './components/Prestamos'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'informes',
                element: <Informes/>
            },
            {
                path: 'gesuser',
                element: <GesUser/>
            },
            {
                path: 'prestamos',
                element: <Prestamos/>
            }
        ]
    }
])
function App() {
    return (
        <RouterProvider router={router} />
    );
}
export default App;

