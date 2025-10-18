#!/bin/bash

echo "🚀 Deploying Point de Capiton Next.js App to Vercel"
echo "=================================================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "Building app..."
npm run build

echo "Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "Your infinite animation is now live! 🎬"
