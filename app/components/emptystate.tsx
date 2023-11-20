'use client'
import Image from 'next/image';
import React from 'react'

 const EmptyState = () => {
  return (
    <div className='w-full rounded-lg h-full p-4 bg-gray-100 flex flex-col justify-center items-center'>
        <h1 className='text-[20px] font-medium py-8'>
            Start a Conversation Today!
        </h1>
        <Image 
            src={"/images/conversant.png"}
            alt='conversation.png'
            width={700}
            height={300}
            className='w-[60%] h-[60%]'
        />
    </div>
  )
}

export default EmptyState;