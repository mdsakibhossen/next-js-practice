"use client";
import UserForm from '@/components/userForm/UserForm'
import UserList from '@/components/userList/UserList'
import { useState } from 'react';

const Home = () => {
  // States
  const [message, setMessage] = useState({ text: "", isErr: false,isDelete:false });
  return (
    <main className='min-h-screen bg-slate-800 text-white'>
      <div className="container mx-auto p-5 flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/5 lg:order-2">
        <UserForm message={message} setMessage={setMessage} />
        </div>
        <div className="w-full lg:w-3/5 lg:order-1">
          <UserList message={message} setMessage={setMessage} />
        </div>
      </div>
    </main>
  )
}

export default Home