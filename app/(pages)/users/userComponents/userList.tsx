'use client'
import React from 'react'
import { User } from '@prisma/client';
import UserBox from './userBox';
import { HiOutlineArchive } from 'react-icons/hi';

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({items}) => {
  return (
    <div>
        <aside>
            <div className='bg-white lg:rounded-md lg:h-[80vh] h-[100vh] p-4'>
                <figure className='flex justify-between items-center shadow-md py-3 px-4 mb-4 rounded-md'>
                    <h1 className='text-black text-[1.5em] font-medium'>Chat</h1>
                    <HiOutlineArchive size={30} />
                </figure>
                <div>{
                    items.map((item) => (
                        <UserBox 
                        key={item.id}
                        data={item}
                        />
                    ))
                    }</div>
            </div>
        </aside>
    </div>
  )
}

export default UserList;