import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Simple SVG icon components
const ShieldIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const MailIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const LockIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const EyeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

const EyeOffIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
)

const FingerprintIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path>
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"></path>
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
    <path d="M8.65 22c.21-.66.45-1.32.57-2 .1-.5.15-1 .15-1.5 0-1.7-.39-2.5-.39-2.5"></path>
    <path d="M19 13.5c0 .3-.1.6-.2.9"></path>
    <path d="M16 17c.27.38.68 1.13.68 2.34"></path>
    <path d="M13.5 21c.27-.3.5-1.5.5-2.5v-1"></path>
  </svg>
)

const InfoIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const Login = () => {
  const [inputType, setInputType] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [enableBiometrics, setEnableBiometrics] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showMFAModal, setShowMFAModal] = useState(false)
  const [mfaCode, setMfaCode] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [shake, setShake] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const navigate = useNavigate()

  // Auto-detect country code from browser locale
  useEffect(() => {
    const locale = navigator.language
    const countryMap: { [key: string]: string } = {
      'en-US': '+1', 'en-GB': '+44', 'en-CA': '+1',
      'fr-FR': '+33', 'de-DE': '+49', 'es-ES': '+34',
      'it-IT': '+39', 'jp-JP': '+81', 'cn-CN': '+86',
      'in-IN': '+91', 'au-AU': '+61', 'br-BR': '+55',
    }
    const detected = countryMap[locale] || '+1'
    setCountryCode(detected)
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format'
      }
    } else {
      const phoneRegex = /^\d{10,15}$/
      if (!phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!phoneRegex.test(phone)) {
        newErrors.phone = 'Invalid phone number'
      }
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)
    setErrors({})
    
    try {
      // Call the actual API
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: inputType === 'email' ? email : `${countryCode}${phone}`,
          password,
          enableBiometrics,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setIsLoading(false)
        setErrors({ form: data.error || 'Login failed. Please try again.' })
        setShake(true)
        setTimeout(() => setShake(false), 500)
        return
      }

      // Store the token
      localStorage.setItem('auth_token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      
      setIsLoading(false)

      // Check if MFA is required
      if (data.data.requiresMFA || enableBiometrics) {
        setShowMFAModal(true)
      } else {
        completeLogin()
      }
    } catch (error) {
      setIsLoading(false)
      setErrors({ form: 'Network error. Please check your connection.' })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleMFAVerify = () => {
    if (mfaCode.length === 6) {
      setShowMFAModal(false)
      completeLogin()
    } else {
      setErrors({ mfa: 'Invalid code. Please enter 6 digits.' })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const completeLogin = () => {
    localStorage.setItem('auth_token', 'demo-jwt-token-' + Date.now())
    localStorage.setItem('mfa_enabled', enableBiometrics.toString())
    
    // Fade out animation
    const loginScreen = document.querySelector('.login-screen')
    if (loginScreen) {
      loginScreen.classList.add('fade-out')
    }
    
    setTimeout(() => {
      navigate('/dashboard')
    }, 500)
  }

  return (
    <div className={`login-screen ${shake ? 'shake' : ''}`}>
      <div className="login-container">
        {/* Header with Logo */}
        <div className="login-header">
          <div className="login-logo">
            <ShieldIcon size={40} />
            <span className="logo-letters-small">FC</span>
          </div>
          <h1 className="login-title">Welcome to FastCash</h1>
          <p className="login-subtitle">Fast, Secure Transactions</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Input Type Toggle */}
          <div className="input-type-toggle">
            <button
              type="button"
              className={inputType === 'email' ? 'active' : ''}
              onClick={() => setInputType('email')}
            >
              Email
            </button>
            <button
              type="button"
              className={inputType === 'phone' ? 'active' : ''}
              onClick={() => setInputType('phone')}
            >
              Phone
            </button>
          </div>

          {/* Email/Phone Input */}
          {inputType === 'email' ? (
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <MailIcon size={20} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          ) : (
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper phone-wrapper">
                <PhoneIcon size={20} className="input-icon" />
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="country-code-select"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234567890"
                  className={errors.phone ? 'error' : ''}
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          )}

          {/* Password/PIN Input */}
          <div className="input-group">
            <label htmlFor="password">Password / PIN</label>
            <div className="input-wrapper">
              <LockIcon size={20} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* MFA Biometrics Toggle */}
          <div className="mfa-toggle">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={enableBiometrics}
                onChange={(e) => setEnableBiometrics(e.target.checked)}
              />
              <span className="checkmark">
                {enableBiometrics && <CheckIcon size={12} />}
              </span>
              <span className="checkbox-label">
                <FingerprintIcon size={18} />
                Enable Biometrics (Face ID / Touch ID)
              </span>
            </label>
          </div>

          {/* Form Error */}
          {errors.form && <div className="form-error">{errors.form}</div>}

          {/* Login Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Authenticating...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="#" className="link-primary">Forgot Password?</a>
          </div>
        </form>

        {/* AI Fraud Detection Note */}
        <div className="security-note">
          <div className="security-note-content">
            <ShieldIcon size={18} />
            <span>Protected by AI Fraud Detection</span>
            <button
              type="button"
              className="info-button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <InfoIcon size={16} />
            </button>
          </div>
          {showTooltip && (
            <div className="tooltip">
              Real-time monitoring analyzes login patterns, device fingerprints, and behavioral biometrics to detect and prevent unauthorized access instantly.
            </div>
          )}
        </div>

        {/* Sign Up Button */}
        <div className="signup-section">
          <p>Don't have an account?</p>
          <button
            type="button"
            className="signup-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* MFA Modal */}
      {showMFAModal && (
        <div className="mfa-modal-overlay">
          <div className="mfa-modal">
            <div className="mfa-modal-header">
              <FingerprintIcon size={48} />
              <h2>Two-Factor Authentication</h2>
              <p>Enter the 6-digit code from your authenticator app</p>
            </div>
            <div className="mfa-input-group">
              <input
                type="text"
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="mfa-input"
                autoFocus
              />
              {errors.mfa && <span className="error-text">{errors.mfa}</span>}
            </div>
            <div className="mfa-modal-actions">
              <button
                type="button"
                className="mfa-cancel-button"
                onClick={() => setShowMFAModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="mfa-verify-button"
                onClick={handleMFAVerify}
                disabled={mfaCode.length !== 6}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
