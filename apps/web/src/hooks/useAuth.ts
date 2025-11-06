import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3001'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = async () => {
    // Check for stored JWT token
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      // Validate token with API
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
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
    localStorage.removeItem('user')
    localStorage.removeItem('mfa_enabled')
    localStorage.removeItem('kyc_completed')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, checkAuth, logout }
}
