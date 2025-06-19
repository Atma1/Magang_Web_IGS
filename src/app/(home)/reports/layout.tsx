import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Citizen Reports | LEWS',
    description: 'Report landslide incidents or concerns, and view existing reports.'
};

export default function ReportsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
