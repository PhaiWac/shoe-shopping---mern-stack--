import axios from 'axios';
import React, { useState } from 'react'

function ModalEditProduct({id , data}) {
    const [value ,setValue] = useState({
        name : data.name, 
        price : data.price,
        count : data.count ,
        description : data.description,
        file : data.img ,
    })


    const [file_val ,setFile] = useState('') ;

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setValue({...value,[e.target.name] : e.target.files[0]})
            return setFile(e.target.files[0].filename)
        }
        setValue({...value,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        
        const FD = new FormData() ;

        FD.append('name',value.name)
        FD.append('price',value.price)
        FD.append('count',value.count)
        FD.append('description',value.description)
        FD.append('file',value.file)
        
        try {
            await axios.patch(`/api/product/${id}`,FD);
   
            resetForm();
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        setValue({
            name : '', 
            price : '',
            count : '' ,
            description : '',
            file : '' ,
        });
        setFile('');
    }
    
    return (
        <>
            <input type="checkbox" id= {id} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className='gap-5 grid'>
                        <label className="input input-bordered flex items-center gap-2">
                            ชื่อสินค้า
                            <input type="text" name='name' value={value.name} className="grow" onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            ราคาสินค้า
                            <input type="number" className="grow" name='price' value={value.price} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            จำนวน
                            <input type="number" className="grow" value={value.count} name='count' onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            คำอธิบาย
                            <input type="text" className="grow" value={value.description} name='description' onChange={handleChange} />
                        </label>
                        <input type="file" className="grow file-input file-input-bordered" value={file_val} name='file' onChange={handleChange} />
                        <button className="btn btn-primary">เพิ่มสินค้า</button>
                    </form>
                    <div className="modal-action">
                        <label htmlFor= {id} className="btn">ยกเลิก</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalEditProduct;
 