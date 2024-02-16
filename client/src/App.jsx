import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route , Routes } from 'react-router-dom' ;
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
      </Routes>
    </>
  )
}

export default App
