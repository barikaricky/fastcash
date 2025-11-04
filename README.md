# FastCash: Secure AI-Powered Payment System

FastCash is a modern financial app designed to deliver ultra-fast, secure transactions in the global digital economy. Leveraging AI for proactive fraud protection and adaptive multi-factor authentication (MFA).

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/barikaricky/fastcash.git
cd fastcash

# Make scripts executable
chmod +x scripts/*.sh

# Run setup (this will handle everything)
./scripts/setup.sh
```

### Starting the Application

```bash
# Start all services
npm run dev

# Or start specific services
npm run web:dev      # Web app only
npm run mobile:dev   # Mobile app only
npm run api:dev      # API services only
```

### Development URLs

- **Web App**: http://localhost:5173
- **API Gateway**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Transaction Service**: http://localhost:3002
- **AI Fraud Service**: http://localhost:8000

## 📁 Project Structure

```
fastcash/
├── apps/
│   ├── web/                    # React PWA
│   ├── mobile/                 # React Native
│   └── api/                    # Microservices
│       ├── gateway/
│       ├── auth-service/
│       ├── transaction-service/
│       ├── notification-service/
│       └── ai-fraud-service/
├── packages/                   # Shared packages
│   ├── ui/
│   ├── utils/
│   ├── config/
│   └── types/
├── infra/                      # Infrastructure
├── scripts/                    # Automation scripts
└── docker-compose.yml
```

## 🛠️ Available Commands

```bash
npm run dev           # Start all services
npm run build         # Build all packages
npm run test          # Run all tests
npm run lint          # Lint all code
npm run docker:up     # Start Docker services
npm run docker:down   # Stop Docker services
```

## 🗄️ Database Services

| Service    | Port  | URL |
|------------|-------|-----|
| PostgreSQL | 5432  | `postgresql://fastcash:fastcash_dev@localhost:5432/fastcash_db` |
| MongoDB    | 27017 | `mongodb://fastcash:fastcash_dev@localhost:27017/fastcash_db` |
| Redis      | 6379  | `redis://localhost:6379` |

## 🔧 Troubleshooting

### Services won't start

```bash
# Check Docker services
docker compose ps

# Restart services
npm run docker:down
npm run docker:up
```

### Port conflicts

Edit `.env` file to change service ports.

### Clear everything and restart

```bash
npm run docker:down
npm run clean
./scripts/setup.sh
```

## 📚 Documentation

- [Architecture](apps/docs/architecture.md)
- [Setup Guide](apps/docs/setup.md)
- [API Documentation](apps/docs/api.md)
- [Roadmap](apps/docs/roadmap.md)

## 🔐 Security

- AES-256 encryption
- TLS 1.3
- PCI DSS compliant
- GDPR compliant
- AI-powered fraud detection

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
