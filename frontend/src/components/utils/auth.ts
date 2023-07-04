import secureLocalStorage from "react-secure-storage"

export const isAuthenticated = () => {
  if (secureLocalStorage.getItem('token')) {
    return true
  }

  return false
}