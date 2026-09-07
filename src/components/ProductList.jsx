import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { firebaseApp } from '../firebaseConfig'

const db = getFirestore(firebaseApp)

export default function ProductList(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,'products'))
      setProducts(snap.docs.map(d=>({ id: d.id, ...d.data() })))
    }
    load()
  },[])

  return (
    <div>
      <h2>Products</h2>
      <table className="products">
        <thead><tr><th>SKU</th><th>Name</th><th>Price</th><th>Qty</th></tr></thead>
        <tbody>
          {products.map(p=> (
            <tr key={p.id}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.qty_on_hand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
