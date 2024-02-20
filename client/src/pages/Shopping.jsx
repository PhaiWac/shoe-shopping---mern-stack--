import React, { useEffect } from 'react'
import Datatable from '../components/Shopping/Datatable'
import { usePermissionQuery } from '../service/useapi';
import {useNavigate} from 'react-router-dom'

function Shopping() {
  const {data , isLoading} = usePermissionQuery() ;

  const navigate = useNavigate() ;
  useEffect(() => {
      if (data == 'none' ) {
          navigate('/home')
      }
  },[data]) ;

  if (isLoading) return ;
  
  return (
    <>
        <Datatable/>
    </>
  )
}

export default Shopping