import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { AppProvider } from '@/context/AppContext';
import { ClerkProvider } from '@clerk/nextjs'
import Layout from '@/components/layout/Layout';
import ClientSetup from './client-setup';

export const metadata = {
    title: 'LEWS Dashboard | Landslide Early Warning System',
    description: 'Advanced colorful real-time landslide monitoring dashboard',
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <AppProvider>
                        <Layout>
                            <ClientSetup />
                            {children}
                            <Toaster richColors />
                        </Layout>
                    </AppProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
