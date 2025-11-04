import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { useAuth } from './hooks/useAuth'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    const initializeApp = async () => {
      await checkAuth()
      // Minimum splash screen time for branding
      setTimeout(() => setIsLoading(false), 2000)
    }
    
    initializeApp()
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
