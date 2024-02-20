import React, { useEffect, useState } from 'react'
import { useAuthUserQuery } from '../service/useapi';

function Editprofile() {

  const { data, refetch, isLoading } = useAuthUserQuery();


  const [value, setValue] = useState({
    email: data?.email,
    username: data?.username,
    cost: data?.cost,
    address: data?.address,
    phone: data?.phone,
  })

  const [pass, setPass] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
  })


  useEffect(() => {
    if (data) {
      setValue({
        email: data?.email,
        username: data?.username,
        cost: data?.cost,
        address: data?.address,
        phone: data?.phone,
      })
    }
  }, [data])

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleChangePass = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`/api/user/:localid`, value);

    } catch (err) {
      console.error(err);
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    console.log(pass)
    if (pass.newpassword != pass.confirmpassword) {
      return toast.error('รหัสผ่านไม่ตรงกัน กรุณาลองใหม่')
    }

    try {
      await axios.patch(`/api/password/${id}`, pass)
        .then(res => {
          if (res.status !== 201) {
            return toast.error(res.data)
          } else {
            setPass({ oldpassword: '', newpassword: '', confirmpassword: '' })
            return toast.success('เปลี่ยนรหัสผ่านสำเร็จ')
          }
        })
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <p className="text-center mt-12">กำลังโหลดข้อมูล</p>
  return (
    <>
      <div className="container mx-auto shadow-lg rounded-xl mt-12 p-5 ">
        <form onSubmit={handleSubmit} className='gap-5 grid'>
          <label className="input input-bordered flex items-center gap-2">
            ชื่อผู้ใช้
            <input type="text" className="grow" name='username' value={value.username} onChange={handleChange} />
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
        <form onSubmit={handleChangePassword} className='grid gap-5 mt-5'>
          <label className="input input-bordered flex items-center gap-2">
            รหัสผ่านเก่า
            <input type="password" className="grow" value={pass.oldpassword} name='oldpassword' onChange={handleChangePass} required />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            รหัสผ่านใหม่
            <input type="password" className="grow" value={pass.newpassword} name='newpassword' onChange={handleChangePass} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            ยืนยัน
            <input type="password" className="grow" value={pass.confirmpassword} name='confirmpassword' onChange={handleChangePass} />
          </label>
          <button className="btn btn-warning">เปลี่ยนรหัสผ่าน</button>
        </form>
      </div>
    </>
  )
}

export default Editprofile