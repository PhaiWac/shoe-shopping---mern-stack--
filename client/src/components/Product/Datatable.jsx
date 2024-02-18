import { useCallback, useEffect } from 'react';
import { useGetDataProductQuery } from '../../service/datatable';
import axios from 'axios';
import ModalEditProduct from './ModalEditProduct';

function Datatable() {
    const { data, error, isLoading, isFetching, refetch } = useGetDataProductQuery({},{
        pollingInterval: 1000,
        skipPollingIfUnfocused: true,
    })

    if (isLoading) return <p>loadding</p>

    const handleDelete = async (id) => {
       await axios.delete(`/api/product/${id}`)
    } 


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคาสินค้า</th>
                            <th>ขายทั้งหมด</th>
                            <th>คงเหลือ</th>
                            <th>คำอธิบาย</th>
                            <th>แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v) => (
                            <tr key={v._id}>
                                <td>
                                    <img src= {`/image/${v.img}`} className='md:w-12' alt="" />
                                </td>
                                <td>{v.name}</td>
                                <td>{v.price}</td>
                                <td>{v.sale}</td>
                                <td>{v.count}</td>
                                <td>{v.description}</td>
                                <td className='flex gap-5'>
                                    <label htmlFor={v._id} className="btn btn-warning">แก้ไข</label>
                                    <ModalEditProduct id = {v._id} data = {v}/>
                                    <button onClick={() => handleDelete(v._id)} className="btn btn-error">ลบ</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Datatable