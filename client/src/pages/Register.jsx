import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { Icon } from '@iconify-icon/react';
import axios from 'axios' ;

import {  toast } from 'react-toastify';

function Register() {

    const navitgate = useNavigate() ;

    const [value , setValue] = useState({
        email : '' ,
        username : '',
        password : '' ,
        confirmpassword : 'a' ,
        address : '' ,
        phone : '',
    }) ;

    const [alert , setAlert] = useState(null) ;

    const updateValue = useCallback((e) => {

        setValue({...value, [e.target.name] : e.target.value}) ;
    },[value])

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault() ;
        setAlert(false);

        if (value.confirmpassword !== value.password) {
            return setAlert('รหัสไม่ตรงกัน')
        } 

        try {
            const res = await axios.post('/api/register',value,{withCredentials : true});

            console.log(res.status)
            if (res.status == 207) {
                setAlert('อีเมลนี้มีผู้ใชงานแล้ว')
            } else {
                navitgate('/login')
            }
        } catch (err) {
            console.log("Register Error ",err)
        } 

  
    },[value])

    return (
        <>

            <div className="shadow-lg bg-base-100 rounded-lg w-[80%] mb-5 mt-12 md:mt-12 mx-auto p-10 md:p-20  grid grid-cols-1 gap-5 md:w-fit">

                <h1 className="text-2xl text-center md:text-4xl font-bold text-primary">
                    Register Your Account
                </h1>

                {alert && (
                    <>
                    <div className="p-5 alert">
                        <p className="text-center">{alert}</p>
                    </div>
                    </>
                )}

                <form onSubmit={handleSubmit} className="p-5 grid gap-5">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" className="grow" placeholder="Email" name='email' onChange={updateValue} required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow" placeholder="Username" name='username' onChange={updateValue} required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" placeholder="Password" name='password'  onChange={updateValue} required/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" placeholder="Confirm Password" name='confirmpassword'  onChange={updateValue} required/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <Icon icon="entypo:address" />
                        <input type="text" className="grow" placeholder="Address" name = 'address'  onChange={updateValue} required/>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <Icon icon="ic:baseline-phone" />
                        <input type="number" className="grow" placeholder="Phone" name='phone'  onChange={updateValue} required/>
                    </label>

                    <button className="btn btn-primary w-full">Register</button>

                    <Link to={'/login'} className='text-center text-primary '>Login</Link>
                </form>

            </div>

        </>
    )
}

export default Register