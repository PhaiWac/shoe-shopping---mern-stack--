import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserData } from '../libs/navbarSlice';

function Login() {

    const dispatch = useDispatch() ;

    const [value ,setValue] = useState({
        email : '' ,
        password : '' ,
    })

    const navitgate = useNavigate() ;

    const [alert , setAlert] = useState(null) ;

    const updateValue = useCallback((e) => {
        setValue({...value,[e.target.name] : e.target.value}) ;
    },[value])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault() ;
        setAlert(false) ;

        try {
            await axios.post('/api/login',value,{withCredentials : true})
            .then(res => {
                // console.log(res.status)
                if (res.status == 201) {
                    dispatch(setUserData(res.data)) ;
                    navitgate('/home')
                } else {
                    setAlert('รหัสผ่านหรือเมลไม่ถูกต้อง')
                }
            })
        } catch (err) {
            console.log('login Err' , err) ;
        }

    },[value])

    return (
        <>
            <div className="mt-24 mx-auto">
                <div className="shadow-lg bg-base-100 rounded-lg  p-10 md:p-20 grid grid-cols-1 gap-5 md:w-fit">

                    <h1 className="text-2xl text-center md:text-4xl font-bold text-primary">
                        Login to your account
                    </h1>

                    {alert && (<div className="p alert">{alert}</div>)}
                    <form onSubmit={handleSubmit} className="p-5 grid gap-5">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="email" className="grow" placeholder="Email" name='email' onChange={updateValue} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Password" name='password' onChange={updateValue} />
                        </label>

                        <button className="btn btn-primary w-full">Login</button>

                        <Link to={'/register'} className='text-center text-primary '>Sign Up</Link>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login