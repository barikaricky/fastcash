#!/bin/bash
set -e

echo "🚀 FastCash Setup Script"
echo "========================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_info() { echo -e "${YELLOW}ℹ $1${NC}"; }

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi
print_success "Node.js $(node -v) found"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker"
    exit 1
fi
print_success "Docker found"

# Create .env if not exists
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success ".env file created"
fi

# Install dependencies
print_info "Installing dependencies..."
npm install
print_success "Root dependencies installed"

print_info "Installing workspace dependencies..."
npm install --workspaces
print_success "Workspace dependencies installed"

# Start Docker services
print_info "Starting Docker services..."
docker compose up -d
sleep 5
print_success "Docker services started"

echo ""
print_success "Setup complete! 🎉"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
