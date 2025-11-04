import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Icon components
const ShieldIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const UserIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
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

const CameraIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
)

const UploadIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
)

const CheckCircleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const CheckIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const XIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
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

const QrCodeIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
)

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()

  // Step 1: User Details
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailChecking, setEmailChecking] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null)

  // Step 2: MFA Setup
  const [enableBiometrics, setEnableBiometrics] = useState(false)
  const [totpSecret, setTotpSecret] = useState('JBSWY3DPEHPK3PXP')
  const [verificationCode, setVerificationCode] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  // Auto-detect country code
  useEffect(() => {
    const locale = navigator.language
    const countryMap: { [key: string]: string } = {
      'en-US': '+1', 'en-GB': '+44', 'fr-FR': '+33', 'de-DE': '+49',
      'in-IN': '+91', 'cn-CN': '+86', 'jp-JP': '+81', 'au-AU': '+61',
    }
    setCountryCode(countryMap[locale] || '+1')
  }, [])

  // Check email availability (debounced)
  useEffect(() => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailAvailable(null)
      return
    }

    const timer = setTimeout(async () => {
      setEmailChecking(true)
      
      try {
        // Call the actual API
        const response = await fetch('http://localhost:3001/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()
        
        if (response.ok) {
          setEmailAvailable(data.available)
        } else {
          setEmailAvailable(null)
        }
      } catch (error) {
        console.error('Email check failed:', error)
        setEmailAvailable(null)
      }
      
      setEmailChecking(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [email])

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z\d]/.test(pwd)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C853']

  // Step 1 validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email'
    else if (emailAvailable === false) newErrors.email = 'Email already taken'
    
    if (!phone) newErrors.phone = 'Phone is required'
    else if (!/^\d{10,15}$/.test(phone)) newErrors.phone = 'Invalid phone number'
    
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        setShake(true)
        setTimeout(() => setShake(false), 500)
        return
      }
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    } else {
      navigate('/login')
    }
  }

  const handleComplete = async () => {
    // Validate verification code for step 2
    if (verificationCode.length !== 6) {
      setErrors({ verificationCode: 'Please enter the 6-digit verification code' })
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setErrors({})

    // Call the actual registration API
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone: `${countryCode}${phone}`,
          password,
          kycDocumentId: null,  // KYC will be done later
          enableBiometrics,
          totpSecret,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ form: data.error || 'Registration failed. Please try again.' })
        setShake(true)
        setTimeout(() => setShake(false), 500)
        return
      }

      // Store the token and user data
      localStorage.setItem('auth_token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      localStorage.setItem('kyc_completed', 'false')  // Mark KYC as incomplete
      
      // Show welcome modal
      setShowWelcomeModal(true)
    } catch (error) {
      setErrors({ form: 'Network error. Please check your connection.' })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleWelcomeComplete = () => {
    setShowWelcomeModal(false)
    navigate('/dashboard')
  }

  const progressPercentage = (currentStep / 2) * 100

  return (
    <div className={`signup-screen ${shake ? 'shake' : ''}`}>
      <div className="signup-container">
        {/* Header */}
        <div className="signup-header">
          <div className="signup-logo">
            <ShieldIcon size={36} />
            <span className="logo-letters-small">FC</span>
          </div>
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">Join FastCash for secure transactions</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">{currentStep > 1 ? <CheckIcon /> : '1'}</div>
              <span className="step-label">Details</span>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">{currentStep > 2 ? <CheckIcon /> : '2'}</div>
              <span className="step-label">Security</span>
            </div>
          </div>
        </div>

        {/* Step 1: User Details */}
        {currentStep === 1 && (
          <div className="signup-step">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <UserIcon size={20} className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className={errors.fullName ? 'error' : ''}
                />
              </div>
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
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
                  className={errors.email ? 'error' : emailAvailable === false ? 'error' : ''}
                />
                {emailChecking && <div className="input-spinner"></div>}
                {emailAvailable === true && <CheckCircleIcon size={20} />}
                {emailAvailable === false && <XIcon size={20} />}
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper phone-wrapper">
                <PhoneIcon size={20} className="input-icon" />
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="country-code-select">
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+86">🇨🇳 +86</option>
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
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <LockIcon size={20} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className={errors.password ? 'error' : ''}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength / 4) * 100}%`,
                        background: strengthColors[passwordStrength],
                      }}
                    ></div>
                  </div>
                  <span className="strength-label" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <LockIcon size={20} className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
                  {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>
        )}

        {/* Step 2: MFA Setup (was Step 3) */}
        {currentStep === 2 && (
          <div className="signup-step">
            <div className="mfa-setup-section">
              <h3 className="section-title">Secure Your Account</h3>
              <p className="section-subtitle">Set up multi-factor authentication for added security</p>

              <div className="mfa-option">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={enableBiometrics}
                    onChange={(e) => setEnableBiometrics(e.target.checked)}
                  />
                  <span className="checkmark">{enableBiometrics && <CheckIcon />}</span>
                  <span className="checkbox-label">
                    <FingerprintIcon size={20} />
                    Enable Biometric Authentication
                  </span>
                </label>
                <p className="option-description">Use Face ID or Touch ID for quick access</p>
              </div>

              <div className="totp-setup">
                <h4 className="totp-title">Authenticator App (TOTP)</h4>
                <p className="totp-subtitle">Scan this QR code with your authenticator app</p>
                
                <div className="qr-code-container">
                  <div className="qr-code-placeholder">
                    <QrCodeIcon size={120} />
                  </div>
                  <div className="totp-secret">
                    <span className="secret-label">Manual Entry Code:</span>
                    <code className="secret-code">{totpSecret}</code>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="verificationCode">Verification Code</label>
                  <input
                    id="verificationCode"
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className="verification-input"
                  />
                </div>
              </div>

              {/* KYC Note */}
              <div className="kyc-note">
                <ShieldIcon size={16} />
                <span>Complete identity verification after signup to unlock full features</span>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="privacy-note">
          <ShieldIcon size={16} />
          <span>Your data is encrypted and compliant with GDPR/PCI DSS</span>
        </div>

        {/* Navigation Buttons */}
        <div className="signup-actions">
          <button type="button" onClick={handleBack} className="back-button">
            {currentStep === 1 ? 'Back to Login' : 'Back'}
          </button>
          <button type="button" onClick={handleNext} className="next-button">
            {currentStep === 2 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <div className="confetti"></div>
            <div className="welcome-icon">
              <CheckCircleIcon size={72} />
            </div>
            <h2>Welcome to FastCash!</h2>
            <p className="welcome-subtitle">Your account has been created successfully</p>
            <div className="welcome-info">
              <p>✅ Account created</p>
              <p>⚠️ Complete KYC verification to unlock all features</p>
            </div>
            <button onClick={handleWelcomeComplete} className="welcome-button">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
