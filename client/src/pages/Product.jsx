import React from 'react'
import Datatable from '../components/Product/Datatable';
import ModalAddProduct from '../components/Product/ModalAddProduct';


function Product() {
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