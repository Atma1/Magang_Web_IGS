import { useState, useEffect, useCallback } from 'react';
import { EducationContent } from '@/types'

export function useEducation() {
    const [educations, setEducations] = useState<EducationContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEducations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`);
            if (!res.ok) throw new Error('Failed to fetch education');
            const data = await res.json();
            setEducations(data);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    const addEducation = useCallback(async (edu: Omit<EducationContent, 'id'>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`, {
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

    const updateEducation = useCallback(async (id: number, edu: Omit<EducationContent, 'id'>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education/${id}`, {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education/${id}`, { method: 'DELETE' });
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
