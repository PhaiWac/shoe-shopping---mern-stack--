import UserDatatable from '../components/User/UserDatatable'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function Users() {
  // const navbar = useSelector((state) => state.navbar);
  // const native = useNavigate()
  // useEffect(() => {
  //     if (!navbar.userdata) {
  //         native('/login')
  //     }
  //  },[])


  return (
    <>
        <UserDatatable/>
    </>
  )
}

export default Users