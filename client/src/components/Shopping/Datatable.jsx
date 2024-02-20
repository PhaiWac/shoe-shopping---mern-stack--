import React, { useEffect, useState } from 'react'
import { useGetOrderQuery } from '../../service/useapi'
import { Icon } from "@iconify-icon/react"
import axios from 'axios';

function Datatable() {

    const { data, isLoading, refetch, isFetching } = useGetOrderQuery()

    const [Total, setTotal] = useState(0);

    const [alert,setAlert] = useState(null) ;

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (data) {
            let total = 0;
            for (const v in data) {
                const value = data[v];
                total += value.price;
            }
            setTotal(total);
        }
    }, [data])

    const handleDelete = async (id) => {
        try {
            if (window.confirm('ต้องการจะลบใช่ไหม')) {
                await axios.delete(`/api/orders/${id}`)
                    .then(res => {
                        if (res.status == 200) {
                            refetch()
                        } 
                    })

            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleBuy = async () => {
        setAlert(null)
        try {
            await axios.post('/api/orders', {
                total : Total
            }).then(res => {
                if (res.status === 207) {
                    setAlert(res.data.message)
                }
                refetch()
            })
        } catch (err) {
            console.log(err)
        }
    }

    if (isLoading || isFetching) {
        return <p className="text-center mt-12">กำลังโหลดข้อมูล</p>
    }

    return (
        <>
            <div className="container mx-auto mt-12 shadow-lg rounded-xl p-5">
                {alert && (
                    <p className="alert w-fit mx-auto mt-5">{alert}</p>
                )}
                <div className="flex justify-between">
                    <h2 className='font-bold my-auto text-2xl'>{Total} บาท</h2>
                    <button className="btn btn-primary my-5 " onClick={handleBuy}>สั่งซื้อ</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ชื่อสินค้า</th>
                                <th>จำนวน</th>
                                <th>ราคาทั้งหมด</th>
                                <th className='w-24'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(items => (
                                <tr key={items._id}>
                                    <td>{items.productname}</td>
                                    <td>{items.price}</td>
                                    <td>{items.count}</td>
                                    <td className='flex gap-5 w-fit'>
                                        <button onClick={() => handleDelete(items.productid)} className="btn btn-ghost text-2xl text-red-500">
                                            <Icon icon="ic:baseline-delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Datatable