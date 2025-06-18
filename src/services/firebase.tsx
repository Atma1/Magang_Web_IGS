import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import { toast } from 'sonner';
import React from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let firebaseApp: any;
let messaging: any;
let firestore: any;

export const initializeFirebase = () => {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(firebaseApp);
    
    if (typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) {
        messaging = getMessaging(firebaseApp);
      }
    }
    
    return { firebaseApp, messaging, firestore };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return { firebaseApp: null, messaging: null, firestore: null };
  }
};

export const setupNotifications = async () => {
  try {
    if (!messaging) return;
    
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Get FCM token
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      
      if (currentToken) {
        console.log('FCM token:', currentToken);
        
        // Handle foreground messages
        onMessage(messaging, (payload) => {
          console.log('Message received:', payload);
          
          if (payload.notification) {
            toast.info(payload.notification.title || 'New Notification', {
              description: payload.notification.body,
              duration: 6000,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
};

export const getFirebaseApp = () => firebaseApp;
export const getFirestoreDB = () => firestore;
