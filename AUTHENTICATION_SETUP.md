# Google Authentication Setup for Retail POS MVP

## Overview
This guide explains how to set up Google Authentication for your Retail POS system with admin role management.

## Features Implemented

✅ **Google Sign-In Integration**
- Modern, responsive login page
- Google OAuth authentication
- Error handling and user feedback

✅ **Role-Based Access Control**
- Admin role for `ranjan111790@gmail.com`
- User role for other accounts
- Automatic role assignment on first login
- Role persistence in Firestore

✅ **Protected Routes**
- Automatic redirection to login for unauthenticated users
- Role-based route protection
- Loading states during authentication

✅ **Firestore Integration**
- User profiles stored in Firestore
- Last login tracking
- User metadata (email, display name, profile picture)

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable the following services:
   - **Authentication** → Google Provider
   - **Firestore Database** → Create database in production mode
   - **Storage** (for future features)

### 2. Google OAuth Configuration

1. In Firebase Console → Authentication → Sign-in method
2. Enable **Google** provider
3. Add your domain(s) to the authorized domains list
4. Create OAuth consent screen:
   - User type: External
   - Add required scopes (email, profile)
   - Add test users (ranjan111790@gmail.com)

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Get these values from: Firebase Console → Project Settings → Your apps

### 4. Firestore Security Rules

Add these rules to your Firestore database:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth.uid == userId || request.auth.uid != null;
      allow write: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    
    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if 
        request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. Install Dependencies

```bash
npm install firebase react-router-dom
```

## Usage

### Using Authentication in Components

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, userRole, isAdmin, logout } = useAuth();

  if (isAdmin) {
    // Show admin features
  }

  return (
    <div>
      <p>Welcome, {user?.displayName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

```javascript
import ProtectedRoute from '../components/ProtectedRoute';
import AdminPanel from '../pages/AdminPanel';

<Routes>
  <Route
    path="/admin"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminPanel />
      </ProtectedRoute>
    }
  />
</Routes>
```

## Admin Access

Currently, only `ranjan111790@gmail.com` has admin access. To add more admins:

### Option 1: Manual Database Update
1. Go to Firestore Console
2. Find the user document in `users` collection
3. Change their `role` field to `'admin'`

### Option 2: Programmatic Update (Admin SDK)
Create a Firebase Cloud Function or use Admin SDK in your backend.

## Testing

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:3000/login`

3. Click "Sign in with Google"

4. Test with different accounts:
   - `ranjan111790@gmail.com` → Should have admin access
   - Other Google account → Should have user access

## Security Considerations

✅ **Implemented:**
- OAuth 2.0 authentication
- Secure token storage (browser managed)
- Role-based access control
- Firestore security rules
- Environment variable protection

⚠️ **Additional Recommendations:**
- Enable 2-factor authentication for admin account
- Regularly review user access logs
- Use HTTPS in production
- Implement rate limiting on Firebase
- Set up Firebase Monitoring alerts
- Regular security audits

## Troubleshooting

### "Firebase is not initialized"
- Check `.env.local` variables
- Ensure Firebase config is correct
- Verify Firebase project settings

### "Google sign-in popup blocked"
- Check browser popup settings
- For Firefox, allow popups for your domain
- Test in incognito/private mode

### "User role not showing"
- Check Firestore rules
- Verify user document exists in Firestore
- Check browser console for errors

### "Cannot find module 'firebase'"
```bash
npm install firebase
```

## Next Steps

1. Create admin dashboard page
2. Build inventory management features
3. Create point of sale interface
4. Set up offline sync capabilities
5. Implement audit logging
6. Add user management for admins

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Sign-In Integration](https://developers.google.com/identity/protocols/oauth2)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [React Router Documentation](https://reactrouter.com/docs)

---

**Last Updated:** 2024
**Status:** Ready for Development