import { useState, useEffect } from 'react';
import { EducationContent } from '@/types';

export function useFetchArticles() {
    const [articles, setArticles] = useState<EducationContent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock data - in production, replace with API call
                const mockArticles: EducationContent[] = [
                    {
                        id: 'e001',
                        title: 'Understanding Landslide Risk Factors',
                        summary: 'Learn about the various factors that contribute to landslide risks in mountainous regions.',
                        content: 'Content about landslide risk factors...',
                        image_url: '/images/education/risk-factors.jpg',
                        category: 'awareness',
                        tags: ['risk', 'causes', 'geology']
                    },
                    {
                        id: 'e002',
                        title: 'Landslide Early Warning Signs',
                        summary: 'Recognize the warning signs that could indicate an imminent landslide.',
                        content: 'Content about warning signs...',
                        image_url: '/images/education/warning-signs.jpg',
                        category: 'awareness',
                        tags: ['warning signs', 'safety', 'observation']
                    },
                    {
                        id: 'e003',
                        title: 'Emergency Response During a Landslide Event',
                        summary: 'Critical actions to take if you find yourself in an active landslide situation.',
                        content: 'Content about emergency response...',
                        image_url: '/images/education/emergency-response.jpg',
                        category: 'safety',
                        tags: ['emergency', 'response', 'safety']
                    }
                ];

                setArticles(mockArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return { articles, loading };
}
