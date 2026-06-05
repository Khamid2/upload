#!/usr/bin/env bash
set -euo pipefail

npm install
npm run build

echo "Editor Handal dependencies installed and production build completed. Run npm run dev for local development or npm start for production."
