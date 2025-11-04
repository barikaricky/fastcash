// Shared configuration constants

export const API_CONFIG = {
  GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://localhost:3000',
  AUTH_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  TRANSACTION_URL: process.env.TRANSACTION_SERVICE_URL || 'http://localhost:3002',
  TIMEOUT: 30000,
}

export const APP_CONFIG = {
  APP_NAME: 'FastCash',
  VERSION: '1.0.0',
  CURRENCY: 'USD',
  LOCALE: 'en-US',
}

export const SECURITY_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  SESSION_TIMEOUT: 3600000, // 1 hour in ms
  MFA_ENABLED: true,
}
