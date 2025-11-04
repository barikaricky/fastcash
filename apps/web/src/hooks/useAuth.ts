import { useState } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = async () => {
    // Check for stored JWT token
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      // Validate token with API
      try {
        const response = await fetch('http://localhost:3001/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      }
    } else {
      setIsAuthenticated(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, checkAuth, logout }
}
