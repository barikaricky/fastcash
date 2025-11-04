// Shared TypeScript types and interfaces

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  currency: string
  type: 'send' | 'receive' | 'request'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  recipientId?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthToken {
  token: string
  expiresAt: Date
  refreshToken?: string
}
