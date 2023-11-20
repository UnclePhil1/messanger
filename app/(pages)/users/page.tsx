'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react';
import React from 'react'
import { toast } from 'react-hot-toast'
import EmptyState from '../../components/emptystate';

 const Users = () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full bg-primary p-8'>
      <EmptyState />
    </div>
  )
}

export default Users;