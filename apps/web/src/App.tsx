import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SplashScreen from './pages/SplashScreen'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './hooks/useAuth'
import './styles/App.css'

// Google OAuth Client ID (you'll get this from Google Cloud Console)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    const initializeApp = async () => {
      await checkAuth()
      setTimeout(() => setIsLoading(false), 2000)
    }
    
    initializeApp()
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
