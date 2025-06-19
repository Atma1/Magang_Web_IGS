import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard | LEWS',
    description: 'Admin dashboard for landslide early warning system'
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    )
}
