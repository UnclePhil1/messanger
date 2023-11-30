'use client'
import { User } from '@prisma/client';
import UserBox from './userBox';
import { HiOutlineUserGroup } from 'react-icons/hi';

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
        <aside>
            <div className='bg-white lg:rounded-md lg:h-[80vh] h-[100vh] p-4'>
                <figure className='flex justify-between items-center py-3 px-4 mb-4 rounded-md shadow-sm'>
                    <h1 className='text-black text-[1.5em] font-medium'>Chat</h1>
                    <HiOutlineUserGroup size={30} />
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
  )
}

export default UserList;