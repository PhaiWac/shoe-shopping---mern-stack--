import Datatable from '../components/Product/Datatable';
import ModalAddProduct from '../components/Product/ModalAddProduct';
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { usePermissionQuery } from '../service/useapi';

function Product() {
  const {data , isLoading} = usePermissionQuery() ;

  const navigate = useNavigate() ;
  useEffect(() => {
      if (data == 'none' || data == 'user') {
          navigate('/home')
      }
  },[data]) ;

  if (isLoading) return ;

  return (
    <>
        <div className="container mt-12 mx-auto">
            <div className="rounded-box shadow-lg p-5">
                <div className="flex flex-col gap5 mb-5 md:flex-row">
                    <label htmlFor="addproduct" className="btn btn-primary">เพิ่มสินค้า</label>
                </div>
                <ModalAddProduct/>
                <Datatable/>
            </div>
        </div>
    </>
  )
}

export default Product