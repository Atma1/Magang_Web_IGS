import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Education | LEWS',
    description: 'Learn about landslide prevention, safety measures, and emergency procedures'
};

export default function EducationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
