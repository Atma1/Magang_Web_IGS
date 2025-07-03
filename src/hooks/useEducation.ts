import { useState, useEffect, useCallback } from 'react';

export interface Education {
    id: number;
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    category: string;
    tags: string[];
}

export function useEducation() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEducations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/education');
            if (!res.ok) throw new Error('Failed to fetch education');
            const data = await res.json();
            setEducations(data);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    const addEducation = useCallback(async (edu: Omit<Education, 'id'>) => {
        try {
            const res = await fetch('http://localhost:5000/api/education', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(edu)
            });
            if (!res.ok) throw new Error('Failed to add education');
            await fetchEducations();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        }
    }, [fetchEducations]);

    const updateEducation = useCallback(async (id: number, edu: Omit<Education, 'id'>) => {
        try {
            const res = await fetch(`http://localhost:5000/api/education/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(edu)
            });
            if (!res.ok) throw new Error('Failed to update education');
            await fetchEducations();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        }
    }, [fetchEducations]);

    const deleteEducation = useCallback(async (id: number) => {
        try {
            const res = await fetch(`http://localhost:5000/api/education/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete education');
            await fetchEducations();
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        }
    }, [fetchEducations]);

    useEffect(() => {
        fetchEducations();
    }, [fetchEducations]);

    return {
        educations,
        loading,
        error,
        fetchEducations,
        addEducation,
        updateEducation,
        deleteEducation
    };
}
