import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.TRANSACTION_SERVICE_PORT || 3002;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Transaction Service',
    timestamp: new Date().toISOString()
  });
});

// Transaction routes
app.post('/api/transactions/send', (req, res) => {
  res.json({ 
    message: 'Send payment endpoint',
    transactionId: 'txn_' + Date.now(),
    status: 'pending'
  });
});

app.get('/api/transactions/history', (req, res) => {
  res.json({ 
    message: 'Transaction history endpoint',
    transactions: []
  });
});

app.listen(PORT, () => {
  console.log(`💰 Transaction Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
