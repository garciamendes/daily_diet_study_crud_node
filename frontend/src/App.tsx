// Third party

//
import { useEffect } from 'react'
import { Routes } from './routes'

export function App() {
  // Hook
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem('token')
  //     sessionStorage.removeItem('user')
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   return () => {
  //     window.addEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [])

  return <Routes />
}