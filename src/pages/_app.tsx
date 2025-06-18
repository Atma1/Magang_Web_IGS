import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { Toaster } from 'sonner';
import { AppProvider } from '../context/AppContext';
import { useEffect } from 'react';
import { initializeFirebase, setupNotifications } from '../services/firebase';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Firebase
    initializeFirebase();
    
    // Set up notifications
    setupNotifications();
  }, []);

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster richColors />
      </Layout>
    </AppProvider>
  );
}
