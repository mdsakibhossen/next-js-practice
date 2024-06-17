"use client";
import Pagination from '@/components/pagination/Pagination';
import UserForm from '@/components/userForm/UserForm'
import UserList from '@/components/userList/UserList'
import {  useState } from 'react';
import { useGetUsersQuery } from "@/redux/services/user";


const Home = ({searchParams}) => {
  const {page,limit} = searchParams;
  let currentPage = Number(page) || 1;
  let currentLimit = Number(limit) || 3;

  // States
  const [message, setMessage] = useState({ text: "", isErr: false,isDelete:false });
  const {
    data,
    isLoading,
    error,
  } = useGetUsersQuery({ currentPage, currentLimit });
  return (
    <main className='min-h-screen bg-slate-800 text-white'>
      <div className="container mx-auto p-5 flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/5 lg:order-2">
        <UserForm message={message} setMessage={setMessage} />
        </div>
        <div className="w-full lg:w-3/5 lg:order-1">
          <UserList message={message} setMessage={setMessage} data={data} isLoading={isLoading} error={error} />
          {data && <Pagination totalUsers={data?.totalUsers} currentPage={currentPage} limit={currentLimit} />}
        </div>
      </div>
    </main>
  )
}

export default Home