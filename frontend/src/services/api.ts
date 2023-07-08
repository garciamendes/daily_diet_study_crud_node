// Third party
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const Token = secureLocalStorage.getItem('token')
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${Token}`
  },
  withCredentials: true
})
