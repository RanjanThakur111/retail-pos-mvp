import React from 'react'
import ProductList from './components/ProductList'
import Pos from './pages/Pos'

export default function App(){
  const [view, setView] = React.useState('pos')
  return (
    <div className="app">
      <header>
        <h1>Retail POS MVP</h1>
        <nav>
          <button onClick={() => setView('pos')}>POS</button>
          <button onClick={() => setView('products')}>Products</button>
        </nav>
      </header>
      <main>
        {view === 'products' ? <ProductList /> : <Pos />}
      </main>
    </div>
  )
}
