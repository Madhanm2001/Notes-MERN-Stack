import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/UseLocalStorage'

const PrivateRoute = () => {
  const { getItem } = useLocalStorage()
  const isAuth = getItem('NotesToken')
  return isAuth ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoute
