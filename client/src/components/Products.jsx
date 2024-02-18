import React, { useCallback, useEffect, useState } from 'react'
import { useGetDataProductQuery } from '../service/datatable';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector , } from 'react-redux';
import {toast} from 'react-toastify'

import axios from 'axios'

function BuyComponent({id}) {

    const userdata = useSelector((state) => state.navbar.userdata);

    const navigate = useNavigate();

    const [count, setCount] = useState(0);

    const handleChange = (e) => {
        let value = Number(e) ;
        if (value < 0) {
            value = 0 ;
        }
        setCount(value) ;
    }

    const handleBuy = useCallback(async () => {
        if (!userdata) {
            return navigate('/login')
        }
        // console.log(handle)
        try {
            await axios.post(`/api/order/${id}`, {
                user : userdata ,
                count : count 
            }).then(res => {
                if (res.status === 200) {
                    // return toast.success('เพิ่มลงตระกร้าแล้ว')
                } else {
                    // return toast.error(res.data.message)
                }
            })
        } catch (err) {
            console.log('Buy Handle is err ', err);
        }
    },[count,userdata])

    return (
        <>
            <div className="join gap-1 mx-auto mt-5">
                <button className="btn btn-outline rounded-none btn-sm" onClick={() => handleChange(count - 1)}>-</button>
                <input className="input input-sm rounded-none input-bordered join-item w-10 text-center" type='text' value={count} onChange={(e) => handleChange(e.target.value)} />
                <button className="btn btn-outline rounded-none btn-sm" onClick={() => handleChange(count + 1)}>+</button>
            </div>
            <button className='btn btn-sm  w-full btn-primary' onClick={handleBuy}>เพิ่มลงตระกร้า</button>
        </>
    )
}

function Products() {
    const { data, error, isLoading, isFetching, refetch } = useGetDataProductQuery()

    
    useEffect(() => {
        refetch();
    },[])

    if (isLoading || isFetching) return <p className='text-center mt-12'>loadding</p>


    return (
        <>
            <div className="mt-12 container mx-auto p-5">
                <div className="flex flex-wrap justify-center md:justify-start gap-5">
                    {data.map((items) => (
                        <React.Fragment key={items._id} >
                            <div className="card bg-base-100 shadow-2xl w-full md:w-[14rem] xl:w-64 ">
                                <figure><img src={`/image/${items.img}`} alt="Shoes" className='w-full' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title font-bold">
                                        {items.name}
                                        <div className={items.count <= 0 ? 'badge badge-error text-white' : 'badge badge-secondary'}>{items.count <= 0 ? 'หมด' : items.count}</div>
                                    </h2>
                                    <p>{items.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{items.name.includes('converse') ? 'Converse' : 'Nike'}</div>

                                    </div>
                                    <BuyComponent id = {items._id} />

                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Products