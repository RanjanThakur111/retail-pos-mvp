import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ProductList({ isAdmin }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: '',
    barcode: '',
    name: '',
    price: '',
    qty_on_hand: '1',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function refreshProducts() {
    try {
      const q = query(collection(db, 'products'), orderBy('name'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
    } catch (err) {
      setError(err.message || 'Could not load products.');
    }
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isAdmin) return;

    const sku = form.sku.trim();
    const name = form.name.trim();
    const price = Number(form.price);
    const qty = Number(form.qty_on_hand);

    if (!sku || !name || !Number.isFinite(price) || price < 0 || !Number.isFinite(qty) || qty < 0) {
      setError('Please enter valid SKU, name, price, and quantity.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await addDoc(collection(db, 'products'), {
        sku,
        barcode: form.barcode.trim(),
        name,
        price,
        qty_on_hand: qty,
      });
      await refreshProducts();
      setForm({ sku: '', barcode: '', name: '', price: '', qty_on_hand: '1' });
    } catch (err) {
      setError(err.message || 'Could not save product.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>Products</h2>

      {error && <div className="alert error">{error}</div>}

      {!products.length && (
        <div className="empty-state">
          No products available yet.
          {isAdmin ? ' Add your first product below.' : ' Ask the admin to add a product.'}
        </div>
      )}

      {isAdmin && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} placeholder="SKU" />
          <input value={form.barcode} onChange={(event) => setForm({ ...form, barcode: event.target.value })} placeholder="Barcode (optional)" />
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" />
          <input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price" />
          <input type="number" min="0" step="1" value={form.qty_on_hand} onChange={(event) => setForm({ ...form, qty_on_hand: event.target.value })} placeholder="Qty" />
          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Product'}</button>
        </form>
      )}

      <table className="products">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.qty_on_hand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
