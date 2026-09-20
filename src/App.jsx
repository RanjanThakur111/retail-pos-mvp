import React from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import ProductList from './components/ProductList'
import Pos from './pages/Pos'
import LoginPage from './pages/LoginPage.jsx'
import { auth, googleProvider } from './config/firebase'

const ADMIN_EMAIL = 'ranjan111790@gmail.com'

export default function App() {
  const [view, setView] = React.useState('pos')
  const [user, setUser] = React.useState(null)
  const [loadingAuth, setLoadingAuth] = React.useState(true)
  const [signingIn, setSigningIn] = React.useState(false)
  const [authError, setAuthError] = React.useState('')

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoadingAuth(false)
      setAuthError('')
    })

    return () => unsubscribe()
  }, [])

  async function handleGoogleSignIn() {
    try {
      setSigningIn(true)
      setAuthError('')
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed. Please try again.')
      } else if (error.code === 'auth/network-request-failed') {
        setAuthError('Network error. Please check your internet connection.')
      } else {
        setAuthError(error.message || 'Unable to sign in. Please try again.')
      }
    } finally {
      setSigningIn(false)
    }
  }

  async function handleSignOut() {
    try {
      setAuthError('')
      await signOut(auth)
    } catch (error) {
      setAuthError(error.message || 'Unable to sign out. Please try again.')
    }
  }

  if (loadingAuth) {
    return <div style={{ padding: 16 }}>Checking session...</div>
  }

  if (!user) {
    return (
      <LoginPage
        onGoogleSignIn={handleGoogleSignIn}
        loading={signingIn}
        error={authError}
      />
    )
  }

  const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL

  return (
    <div className="app">
      <header>
        <h1>Retail POS MVP</h1>
        <nav>
          <button onClick={() => setView('pos')}>POS</button>
          <button onClick={() => setView('products')}>Products</button>
        </nav>
        <div className="auth-controls">
          <span>
            {user.email} {isAdmin ? '(Admin — client-side only)' : ''}
          </span>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </header>
      {authError ? <div className="auth-error-banner">{authError}</div> : null}
      <main>{view === 'products' ? <ProductList /> : <Pos />}</main>
    </div>
  )
}
