'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setUser({ ...user, [id]: value })
  }

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('Login success', response.data)
      router.push('/')
    } catch (error: any) {
      console.log('Login failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='h-screen grid place-items-center w-full mx-auto'>
      <form
        onSubmit={onLogin}
        className='max-w-lg  border rounded-md shadow-2xl space-y-3 p-4 mx-auto mt-8'
      >
        <h1 className='text-center tracking-widest w-full text-xl font-semibold text-blue-500 '>
          {loading ? 'loading...' : 'Login'}
        </h1>
        <hr />
        <div className='mb-4 pt-4'>
          <label htmlFor='email' className='block mb-2 text-sm font-bold'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={user.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2 text-sm font-bold'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={user.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          {buttonDisabled ? 'No Login' : 'Login'}
        </button>
        <p className='text-sm text-right py-4'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-blue-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
