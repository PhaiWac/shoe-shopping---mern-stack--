import React, { useEffect } from 'react'
import { useGetHistoryQuery } from '../../service/useapi'

function Datatable() {

    const { data, isLoading , refetch , isFetching} = useGetHistoryQuery();


    useEffect(() => {
        refetch()
        if (data) {
            console.log(data)
        }
    },[])
    if (isLoading || isFetching) {
        return <h2 className='text-xl text-center mt-12'>Loadding</h2>
    }

    return (
        <>
            <div className="container mx-auto mt-12 shadow-xl p-5 rounded-xl">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ชื่อสินค้า</th>
                                <th>ราคา</th>
                                <th>จำนวน</th>
                                <th>วันที่สั่งซื้อ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(items => (
                                <tr key={items._id}>
                                    <td>{items.productname}</td>
                                    <td>{items.price}</td>
                                    <td>{items.count}</td>
                                    <td>{items.bought.split("T")[0]}</td>
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