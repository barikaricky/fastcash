import { useEffect, useState } from 'react'

// Simple SVG icon components
const ShieldIcon = ({ className, size = 48 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const SplashScreen = () => {
  const [fadeIn, setFadeIn] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    setFadeIn(true)
    
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="splash-screen">
      <div className={`splash-content ${fadeIn ? 'fade-in' : ''}`}>
        {/* Logo with Security Shield */}
        <div className="logo-container">
          <div className="logo-emblem">
            <ShieldIcon className="shield-icon" size={48} />
            <span className="logo-letters">FC</span>
          </div>
          <h1 className="logo-text">FastCash</h1>
          <p className="logo-tagline">Secure Digital Payments</p>
        </div>

        {/* Loading Spinner with Status */}
        {isOnline ? (
          <div className="loading-container">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
              <div className="spinner-glow"></div>
            </div>
            <p className="loading-text">Securing Your Connection...</p>
          </div>
        ) : (
          <div className="error-container">
            <p className="error-text">Unable to connect</p>
            <button onClick={handleRetry} className="retry-button">
              Connect Securely
            </button>
          </div>
        )}

        {/* Security Badge */}
        <div className="security-badge">
          <LockIcon size={14} />
          <span>End-to-End Encrypted</span>
        </div>

        {/* Version & AI Branding */}
        <div className="version-info">
          <span>v1.0 – Powered by AI</span>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
