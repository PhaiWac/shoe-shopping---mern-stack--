import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react';

import { useSelector, useDispatch } from 'react-redux'
import { setUsing, setUserData } from '../libs/navbarSlice';
import axios from 'axios';
import ModalEditProfile from './MdalEditProfile';

function Navbar() {

    const navbar = useSelector((state) => state.navbar);
    const dispatch = useDispatch();

    const [usePath, setPath] = useState('/');
    const [theme, setTheme] = useState('');

    // const navigate = useNavigate();

    useEffect(() => {
        setPath(window.location.pathname);
        const theme = localStorage.getItem('Theme');
        if (theme) {
            setTheme(theme)
            document.querySelector('html').setAttribute('data-theme', theme);
        } else {
            setTheme('light');
            localStorage.setItem('Theme', 'light')
            document.querySelector('html').setAttribute('data-theme', 'light');
        }
    }, []);

    const Update = useCallback(() => {
        setPath(window.location.pathname);
    }, [])

    const SetTheme = useCallback(() => {
        const newTheme = theme == 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('Theme', newTheme)
        document.querySelector('html').setAttribute('data-theme', newTheme);
    }, [theme])

    const Logout = useCallback(async () => {
        await axios.post('/api/logout')
        dispatch(setUserData(null))
    }, [])

    return (
        <>

            <p className='text-center bg-primary text-white font-bold p-3'>ร้านขายรองเท้า !!</p>
            <div className="w-full shadow-xl bg-base-100 p-3">
                <div className="container mx-auto flex justify-between">
                    <p className="text-2xl font-bold my-auto text-primary">SHOESHOP</p>

                    <ul className='menu menu-horizontal hidden md:flex'>
                        <li className='dropdown dropdown-hover  '>
                            <Link tabIndex={0} to={'/home'} className='btn btn-ghost font-normal'>Home</Link>
                            {/* <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link>Products</Link></li>
                                <li><Link>Converse</Link></li>
                                <li><Link>Nike</Link></li>
                            </ul> */}
                        </li>
                        <li><Link className='btn btn-ghost font-normal '>Top Up</Link></li>
                        <li><Link className='btn btn-ghost font-normal'>Contact</Link></li>
                    </ul>

                    <div className="hidden my-auto ms-auto md:flex">
                        <button className="btn btn-ghost text-2xl" onClick={SetTheme}>
                            <Icon icon="fluent:dark-theme-20-filled" />
                        </button>
                        {navbar.userdata ? (
                            <>
                                <ModalEditProfile id = {navbar.userdata._id} data = {navbar.userdata}/>
                                <div className="indicator">
                                    <span className='indicator-item badge p-3'>{navbar.userdata.orders.length}</span>
                                    <button className="btn btn-ghost text-xl"><Icon icon="icon-park-outline:shopping" /></button>
                                </div>
                                <div className="tooltip dropdown dropdown-end  dropdown-hover" data-tip={navbar.userdata.email}>
                                    <button tabIndex={1} className="btn btn-ghost text-2xl" >
                                        <Icon icon="iconamoon:profile-circle-fill" />
                                    </button>
                                    <ul tabIndex={1} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52 shadow">
                                        {navbar.userdata && navbar.userdata.email == "admin@gmail.com" && (
                                            <>
                                                <li><Link to={'/admin'}>จัดการเว็ปไซต์</Link></li>
                                            </>
                                        )}
                                        <li>
                                            <label htmlFor={navbar.userdata._id} >
                                                ข้อมูลส่วนตัว
                                            </label>
                                        </li>
                                        <li><Link>ประวัติการซื้อ</Link></li>
                                        <li><Link>เติมเงิน</Link></li>
                                        <li><button onClick={Logout}>ออกจากระบบ</button></li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={'/login'} className="btn btn-ghost">Login</Link>
                            </>
                        )}
                    </div>


                    {/* Mobile */}

                    <div className="drawer w-fit">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button  md:hidden">
                                <Icon icon="fluent:list-bar-16-filled" className='text-3xl' />
                            </label>
                        </div>
                        <div className="drawer-side z-[2]">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                                <div className="p-5 rounded-full w-16 h-16 bg-base-300 grid content-center glass">
                                    <p className='text-4xl text-center  font-bold'>A</p>
                                </div>

                                <p className='text-xl p-2'>Admin@gmail.com</p>

                                <hr className='shadow-lg mb-5' />

                                <li onClick={Update} className={usePath == '/' ? 'text-xl text-primary font-bold' : 'text-xl '} ><Link to={'/'} >หน้าแรก</Link></li>
                                <li onClick={Update} className={usePath == '/products' ? 'text-xl text-primary font-bold' : 'text-xl '} ><Link to={'/products'}>สินค้าทั้งหมด</Link></li>
                                <li onClick={Update} className={usePath == '/topup' ? 'text-xl text-primary font-bold' : 'text-xl '} ><Link to={'/topup'}>เติมเงิน</Link></li>

                                {navbar.userdata != null && (
                                    <>
                                        <li onClick={Update} className={usePath == '/topup' ? 'text-xl text-primary font-bold' : 'text-xl '} ><Link to={'/topup'}>สินค้าของคุณ</Link></li>
                                    </>
                                )}

                                <hr className='shadow-lg mb-5' />

                                <li onClick={Update} className={usePath == '/contact' ? 'text-xl text-primary font-bold' : 'text-xl '} ><Link to={'/contact'}>ติดต่อเรา</Link></li>

                                {navbar.userdata == null && (
                                    <>
                                        <hr className='shadow-lg my-5' />
                                        <div onClick={Update} className="flex justify-between gap-5 w-[45%]">
                                            <Link to={'/login'} className='btn btn-primary w-full'>Login</Link>
                                            <Link to={'/register'} className='btn btn-primary w-full'>Register</Link>
                                        </div>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar