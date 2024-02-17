import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route , Routes } from 'react-router-dom' ;
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useAuthUserQuery } from './service/useapi';

import { useDispatch } from 'react-redux';
import { setUserData } from './libs/navbarSlice';
import Adminpanel from './pages/Adminpanel';
import Product from './pages/Product';
import Users from './pages/Users';

function App() {

  const {data , error , isLoading} = useAuthUserQuery();
  const dispatch = useDispatch() ;

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data)) ;
    } 
  },[data])

  return (
    <>
      <Navbar/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme= {document.querySelector('html').getAttribute('data-theme')}
        transition= 'Bounce'
        /><ToastContainer />
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/home' element = {<Home/>}/>

        {/* Admin  */}
        <Route path='/admin' element = {<Adminpanel/>}/>
        <Route path='/admin/product' element = {<Product/>}/>
        <Route path='/admin/users' element = {<Users/>}/>
      </Routes>
    </>
  )
}

export default App
