 # Retail POS MVP

This repo contains a minimal React + Firebase PWA skeleton for a retail POS MVP.

What is included
- Simple Vite + React frontend (POS screen + product list)
- scripts/import_products.js — CSV import script using the Firebase Admin SDK
- data/products.csv — sample seed data (20 items)

Quick setup (Option B - you deploy)
1. Install Node 18+ and Git
2. Clone repo and install deps:
   npm install
3. Create a Firebase project (Firestore native mode, Authentication, Hosting)
4. Add your Firebase config to src/firebaseConfig.js
5. Create a service account with Firestore access and download JSON (for imports)
6. Import products:
   node scripts/import_products.js /path/to/serviceAccountKey.json data/products.csv
7. Build and deploy the site:
   npm run build
   firebase login
   firebase use --add  # select project
   firebase deploy --only hosting

If you want me to deploy for you, add my deploy account to the Firebase project or provide a short-lived service account key via a secure channel.

Next work I will do (on request)
- Offline queue (IndexedDB) and sync
- Cloud Functions for receipts and idempotent operations
- Auth UI and admin role management
- Better POS UI and barcode scanner support

