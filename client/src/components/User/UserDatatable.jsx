import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetUserQuery } from '../../service/useapi';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,

    getSortedRowModel,

    getPaginationRowModel,
} from '@tanstack/react-table';

import axios from 'axios' ;
import { Icon } from '@iconify-icon/react';
import { toast } from 'react-toastify';
import ModalEditUser from './ModalEditUser';

const columnHelper = createColumnHelper();

function UserDatatable() {
    const { data, error, isLoading ,refetch , isFetching} = useGetUserQuery({},{
        pollingInterval : 1000 ,
        skipPollingIfUnfocused: true ,
    });
    const [sorting, setSorting] = useState([]);

    const handleDelete = async (id) => {
        if (window.confirm("คุณแน่ใจหรอว่าจะลบ")) {
            await axios.delete(`/api/user/${id}`) ;
            refetch ;
        }

    }



    const columns = useMemo(() => [
        columnHelper.accessor('email', {
            header: () => <p>อีเมล</p>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('username', {
            header: () => <p>ผู้ใช้</p>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('phone', {
            header: () => <p>เบอร์</p>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('address', {
            header: () => <p>ที่อยู่</p>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cost', {
            header: () => <p>ยอดเงิน</p>,
            cell: info => info.getValue(),
        }),
        {
            id: 'select',
            header: () => 'แก้ไข',
            cell: ({ row }) => (
              <div className="flex">
               
                <label htmlFor= {row.original._id} className="btn btn-ghost text-2xl ">
                    <Icon icon="ic:baseline-edit" />
                </label>
                <ModalEditUser id = {row.original._id} data = {row.original}/>
                <button className="btn btn-ghost text-2xl text-red-500" onClick={() => handleDelete(row.original._id)}>
                    <Icon icon="ic:baseline-delete" />
                </button>
              </div>
            ),
          },
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        getPaginationRowModel: getPaginationRowModel(),

        getCoreRowModel: getCoreRowModel(),


    });


    

    if (error) {
        return console.log(error);
    }

    if (isLoading) {
        return <p className="text-center mt-12">กำลังโหลด</p>;
    }

    return (
        <>
            <div className="container mx-auto mt-12">

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                className="cursor-pointer"
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                onClick={header.column.getToggleSortingHandler()

                                                }
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <>
                                                        {
                                                            flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        }
                                                    </>
                                                )}
                                                {
                                                    { asc: " ↑", desc: " ↓" }[
                                                    header.column.getIsSorted() ?? null
                                                    ]
                                                }

                                            </th>
                                        )
                                    })}
                 
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {/* {cell.column.columnDef.cell} */}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            {/* {cell.id} */}
                                        </td>

                                    ))}
                     
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserDatatable;
