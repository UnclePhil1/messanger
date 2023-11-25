'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react';
import React from 'react'
import { toast } from 'react-hot-toast'
import EmptyState from '../../components/emptystate';

 const Users = () => {
  return (
    <div className='hidden lg:block h-full bg-primary'>
      <EmptyState />
    </div>
  )
}

export default Users;