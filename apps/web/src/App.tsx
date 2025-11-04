import { useState, useEffect } from 'react'
import './styles/App.css'

function App() {
  const [status, setStatus] = useState({ gateway: 'checking...', auth: 'checking...' })

  useEffect(() => {
    // Check Gateway
    fetch('http://localhost:3000/health')
      .then(res => res.json())
      .then(data => setStatus(prev => ({ ...prev, gateway: data.status })))
      .catch(() => setStatus(prev => ({ ...prev, gateway: 'offline' })))

    // Check Auth Service
    fetch('http://localhost:3001/health')
      .then(res => res.json())
      .then(data => setStatus(prev => ({ ...prev, auth: data.status })))
      .catch(() => setStatus(prev => ({ ...prev, auth: 'offline' })))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">💳 FastCash</h1>
          <p className="text-xl text-gray-600">Secure AI-Powered Payment System</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">🚀 System Status</h2>
            
            <div className="space-y-3">
              <StatusItem label="Web Frontend" status="online" />
              <StatusItem label="API Gateway" status={status.gateway} />
              <StatusItem label="Auth Service" status={status.auth} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-green-900 mb-3">✨ Features</h2>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center">
                <span className="mr-2">⚡</span> Instant P2P Transactions
              </li>
              <li className="flex items-center">
                <span className="mr-2">🤖</span> AI Fraud Detection
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔐</span> Multi-Factor Authentication
              </li>
              <li className="flex items-center">
                <span className="mr-2">💰</span> Multi-Currency Support
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <p className="text-gray-500 text-sm">Version 1.0 | Development Mode</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusItem({ label, status }: { label: string; status: string }) {
  const isOnline = status === 'online' || status === 'ok'
  const statusColor = isOnline ? 'bg-green-500' : 'bg-red-500'
  
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full ${statusColor} mr-2`}></span>
        <span className="text-sm text-gray-600 capitalize">{status}</span>
      </div>
    </div>
  )
}

export default App
