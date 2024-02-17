import React from 'react'
import { Link } from 'react-router-dom'

function Adminpanel() {
    const List = [
        {name : 'จัดการผู้ใช้' , link : '/configuser'} , 
        {name : 'จัดการสินค้า' , link : '/product'} , 
    ]
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