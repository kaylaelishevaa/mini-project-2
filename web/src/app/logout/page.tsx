"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  

  const handleYesLogout = async () => {
    setMessage('')
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Logout failed')
      }

      setMessage('You have successfully logged out.')
    } catch (error: unknown) {
        if (error instanceof Error) {
            setMessage(error.message)
        } 
    }
  }

  const handleNo = () => {
    router.back() 
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm text-center">

        
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to log out from Event Management Platform?
        </p>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleNo}
            className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={handleYesLogout}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
        {message && (
          <p className="mt-4 text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  )
}
