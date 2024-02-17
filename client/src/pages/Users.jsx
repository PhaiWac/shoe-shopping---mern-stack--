import React, { useEffect } from 'react'
import UserDatatable from '../components/User/UserDatatable'

import { useGetUserQuery } from '../service/useapi';

import { useDispatch } from 'react-redux';
import { setUserData } from '../libs/userSlice';

function Users() {



  return (
    <>
        <UserDatatable/>
    </>
  )
}

export default Users