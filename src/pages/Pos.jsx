import React, { useState, useEffect } from 'react'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { firebaseApp } from '../firebaseConfig'

const db = getFirestore(firebaseApp)

export default function Pos(){
  const [cart, setCart] = useState([])
  const [barcode, setBarcode] = useState('')

  function addItem(item){
    setCart(c=>[...c,item])
  }

  async function createSale(){
    const sale = {
      created_at: serverTimestamp(),
      items: cart.map(i=>({ sku: i.sku, name: i.name, price: i.price, qty: 1 })),
      total: cart.reduce((s,i)=>s + (parseFloat(i.price)||0),0),
      status: 'completed'
    }
    await addDoc(collection(db,'sales'), sale)
    setCart([])
    alert('Sale recorded')
  }

  // Quick demo: barcode add will search product from Firestore (very simple)
  useEffect(()=>{
    // placeholder for future offline queue init
  },[])

  return (
    <div>
      <h2>POS</h2>
      <div className="pos-controls">
        <input placeholder="Scan barcode or type SKU" value={barcode} onChange={e=>setBarcode(e.target.value)} />
        <button onClick={async ()=>{
          // Attempt to find product by sku or barcode
          const q = await (await import('firebase/firestore')).getDocs(collection(db,'products'))
          const docs = q.docs.map(d=>({ id: d.id, ...d.data() }))
          const found = docs.find(p=> p.barcode === barcode || p.sku === barcode || p.id === barcode)
          if(found) addItem(found)
          else alert('Product not found in this demo')
          setBarcode('')
        }}>Add</button>
      </div>

      <div className="cart">
        <h3>Cart</h3>
        <ul>
          {cart.map((c,i)=>(<li key={i}>{c.name} — {c.price}</li>))}
        </ul>
        <div>Total: {cart.reduce((s,i)=>s + (parseFloat(i.price)||0),0)}</div>
        <button onClick={createSale} disabled={cart.length===0}>Complete Sale</button>
      </div>
    </div>
  )
}
