import React from 'react'
import { useGetDataProductQuery } from '../service/datatable';
import { Link } from 'react-router-dom';

function Products() {
    const { data, error, isLoading, isFetching, refetch } = useGetDataProductQuery({}, {
        pollingInterval: 1000,
        skipPollingIfUnfocused: true,
    })

    if (isLoading) return <p className='text-center mt-12'>loadding</p>


    return (
        <>
            <div className="mt-12 container mx-auto p-5">
                <div className="grid grid-cols-2 md:flex md:flex-wrap  gap-5">
                    {data.map((items) => (
                        <React.Fragment key={items._id} >
                            <div className="card bg-base-100 shadow-2xl md:w-64 ">
                                <figure><img src= {`/image/${items.img}`} alt="Shoes" className='w-[80%]' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title font-bold">
                                        {items.name}
                                        <div className={items.count <=0 ? 'badge badge-error text-white' : 'badge badge-secondary'}>{items.count <= 0 ? 'หมด' : items.count}</div>
                                    </h2>
                                    <p>{items.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{items.name.includes('converse') ? 'Converse' : 'Nike'}</div>
                                        
                                    </div>
                                    <Link className='btn btn-sm mt-5 w-full btn-primary'>คลิก</Link>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Products