import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sensor Map | LEWS',
    description: 'Interactive map of monitoring stations'
};

export default function MapLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
