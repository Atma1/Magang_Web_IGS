'use client';

import { useEffect } from 'react';
import { initializeFirebase, setupNotifications } from '../services/firebase';

export default function ClientSetup() {
    useEffect(() => {
        // Initialize Firebase
        initializeFirebase();

        // Set up notifications
        setupNotifications();
    }, []);

    return null;
}
