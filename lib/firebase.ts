/**
 * ==============================================================================
 * FIREBASE AUTHENTICATION CLIENT
 * Configured with the Buying House Firebase project credentials
 * ==============================================================================
 */

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAP4L1B2to4tMA_Snhb-o5hX1nBN-rUJ3g',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'buying-house-fa1f5.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'buying-house-fa1f5',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'buying-house-fa1f5.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '230850824891',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:230850824891:web:529e5317792edad170779e',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-K2952MM2GP'
}

// Initialize Firebase App safely (singleton pattern across SSR & client)
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const firebaseAuth = getAuth(firebaseApp)
