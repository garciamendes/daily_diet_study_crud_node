// Third party
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

export const Token = secureLocalStorage.getItem('token')
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})
