import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { usePermissionQuery } from '../service/useapi';

function Adminpanel() {
    const List = [
        { name: 'จัดการผู้ใช้', link: '/users' },
        { name: 'จัดการสินค้า', link: '/product' },
    ]

    const {data , isLoading} = usePermissionQuery() ;

    const navigate = useNavigate() ;
    useEffect(() => {
        if (data == 'none' || data == 'user') {
            navigate('/home')
        }
    },[data]) ;

    if (isLoading) return ;
    
    // const navbar = useSelector((state) => state.navbar);

    // const native = useNavigate()
    // useEffect(() => {
    //     if (!navbar.userdata) {
    //         native('/login')
    //     }
    //  },[])

    return (
        <>
            <div className="container mt-12 mx-auto grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                {List.map(data => (
                    <Link to={`/admin${data.link}`} key={data.name} className="rounded-box p-5 bg-base-200 shadow-lg hover:bg-primary hover:text-white transition-all">
                        <p>{data.name}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Adminpanel