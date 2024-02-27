'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const UserInfo = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('login')
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <div className='h-screen grid place-items-center w-full mx-auto'>
      <div className='max-w-xl space-y-3 mx-auto p-4 border rounded-md shadow-2xl '>
        <div className='flex items-center text-left gap-4'>
          <span>name:</span>
          <span>jhon cena</span>
        </div>
        <div className='flex items-center text-left gap-4'>
          <span>Email:</span>
          <span>jhoncena@gmail.com</span>
        </div>
        <button
          onClick={logout}
          className='bg-red-500 w-full rounded-md p-1 uppercase font-semibold text-base text-white '
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserInfo
