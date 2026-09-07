# Seed data and instructions

This folder contains a sample products.csv used to populate the MVP database.

- File: data/products.csv
- Columns: sku,id,name,description,price,cost,qty_on_hand,barcode,image_url,category
- I added 20 example products across common retail categories.

Next steps (you will perform for Option B - you deploy):
1. Clone this repo locally.
2. When I push the app skeleton, run the provided import script (scripts/import_products.js) or use the Firebase Admin SDK to import CSV into Firestore. I'll add the script to the repo in the next push.
3. If you want a quick manual import now, upload this CSV to the Firebase Console > Firestore Data > Import (or write a small Node script that reads CSV and writes documents).

Admin/Initial setup
- Initial admin email you provided: ranjan111790@gmail.com
- Default outlets: 1 (single-store setup). We can add more later.

If you'd like a different product set or specific SKUs/pricing, tell me and I will regenerate the CSV.
