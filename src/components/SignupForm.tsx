'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const SignupForm: React.FC = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setUser({ ...user, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // You can add your signup logic here
    try {
      setLoading(true)
      const response = await axios.post<{ data: any }>(
        '/api/users/signup',
        user
      )
      console.log('signup success', response.data)
      router.push('/login')

      if (response.status === 200) {
        const form = e.target as HTMLFormElement // Correcting variable name and typings
        form.reset()
      }
    } catch (error: any) {
      console.log('signup failed', error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 5
    ) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [user])

  return (
    <div className='h-screen mx-auto mw-full grid place-items-center'>
      <form
        onSubmit={handleSubmit}
        className='max-w-lg  border rounded-md shadow-2xl space-y-3 p-4 mx-auto mt-8'
      >
        <h1 className='text-center tracking-widest w-full text-xl font-semibold text-blue-500 '>
          {loading ? 'Processing' : 'Signup'}
        </h1>
        <hr />
        <div className='mb-4'>
          <label htmlFor='name' className='block mb-2 text-sm font-bold'>
            Name:
          </label>
          <input
            type='text'
            id='username'
            value={user.username}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
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
          {buttonDisable ? 'No Sign Up' : ' Sign up'}
        </button>{' '}
        <p className='text-sm text-center'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignupForm
