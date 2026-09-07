/*
  scripts/import_products.js
  Usage:
    node scripts/import_products.js /path/to/serviceAccountKey.json data/products.csv
*/

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const admin = require('firebase-admin');

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node scripts/import_products.js /path/to/serviceAccount.json data/products.csv');
    process.exit(2);
  }
  const [serviceKeyPath, csvPath] = args;

  admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(serviceKeyPath))),
  });

  const db = admin.firestore();

  const parser = fs.createReadStream(csvPath).pipe(parse({ columns: true, trim: true }));

  let count = 0;
  for await (const record of parser) {
    const doc = {
      sku: record.sku || null,
      name: record.name || '',
      description: record.description || '',
      price: parseFloat(record.price) || 0,
      cost: parseFloat(record.cost) || 0,
      qty_on_hand: parseInt(record.qty_on_hand || '0', 10),
      barcode: record.barcode || null,
      image_url: record.image_url || null,
      category: record.category || null,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };
    const id = record.id || record.sku || undefined;
    if (!id) {
      console.warn('Skipping row with no id/sku:', record);
      continue;
    }
    await db.collection('products').doc(id).set(doc, { merge: true });
    count++;
  }
  console.log(`Imported ${count} products.`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
