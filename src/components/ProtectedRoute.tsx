// import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function ProtectedRoute({ children }: { children: JSX.Element }){
  const user = useSelector((s: RootState) => s.auth.user)
  if (!user) return <Navigate to="/login" replace />
  return children
}