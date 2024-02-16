import React from 'react'
import { Icon } from '@iconify-icon/react';

function Search() {
  return (
    <>
        <div className="w-1/2 mx-auto mt-12 flex gap-3">
            <input type="text"  className="input bg-primary text-white w-full" />
            <p className='btn bg-base-200'>ค้นหา</p>
        </div>
    </>
  ) 
}

export default Search