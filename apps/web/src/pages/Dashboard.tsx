import { useState } from 'react'

// Simple SVG icon components
const HomeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const CreditCardIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
)

const WalletIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
)

const SettingsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m9.66-10.66l-5.2 3m-3.92 3.92l-5.2 3M2.34 13.34l5.2-3m3.92-3.92l5.2-3"></path>
  </svg>
)

const ShieldIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const TrendingUpIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="dashboard">
      {/* Top Security Bar */}
      <div className="security-bar">
        <div className="security-status">
          <ShieldIcon size={16} className="pulse-icon" />
          <span>Secure Connection Active</span>
        </div>
        <div className="ai-status">
          <TrendingUpIcon size={16} />
          <span>AI Monitoring</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, User</h1>
          <p className="balance-label">Total Balance</p>
          <h2 className="balance-amount">$12,458.30</h2>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-card">
            <CreditCardIcon size={24} />
            <span>Send Money</span>
          </button>
          <button className="action-card">
            <WalletIcon size={24} />
            <span>Request</span>
          </button>
          <button className="action-card">
            <TrendingUpIcon size={24} />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <HomeIcon size={24} />
          <span>Home</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <CreditCardIcon size={24} />
          <span>Transactions</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <WalletIcon size={24} />
          <span>Wallet</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon size={24} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  )
}

export default Dashboard
