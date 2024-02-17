import axios from 'axios';
import React, { useState } from 'react'

function ModalEditUser({id , data}) {

    
    const [value ,setValue] = useState({
        email : data.email, 
        username : data.username,
        cost : data.cost ,
        address : data.address,
        phone : data.phone ,
    })

    const handleChange = (e) => {
        setValue({...value,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        
        try {
            await axios.patch(`/api/user/${id}`,value);
   
        } catch (err) {
            console.error(err);
        }
    }


    
    return (
        <>
            <input type="checkbox" id= {id} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className='gap-5 grid'>
                        <label className="input input-bordered flex items-center gap-2">
                            อีเมล
                            <input type="email" name='email' value={value.email} className="grow" onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            ชื่อผู้ใช้
                            <input type="text" className="grow" name='username' value={value.username} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            ยอดเงิน
                            <input type="number" className="grow" value={value.cost} name='cost' onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            ที่อยู่
                            <input type="text" className="grow" value={value.address} name='address' onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            เบอร์
                            <input type="number" className="grow" value={value.phone} name='phone' onChange={handleChange} />
                        </label>
                        <button className="btn btn-primary">แก้ไข</button>
                    </form>
                    <div className="modal-action">
                        <label htmlFor= {id} className="btn">ยกเลิก</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalEditUser;
 