import UserDatatable from '../components/User/UserDatatable'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { usePermissionQuery } from '../service/useapi';

function Users() {
  const {data , isLoading} = usePermissionQuery() ;

  const navigate = useNavigate() ;
  useEffect(() => {
      if (data) {
        if (data == 'none' || data == 'user') {
          navigate('/home')
      }
      }
  },[data]) ;

  if (isLoading) return ;


  return (
    <>
        <UserDatatable/>
    </>
  )
}

export default Users