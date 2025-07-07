import { useState, useEffect, useCallback } from 'react';
import { Report } from '@/types';

export function useReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/report`);
            const data = await res.json();
            setReports(data);
        } catch (err) {
            console.error('Failed to fetch reports:', err);
            setError('Failed to fetch reports! Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateReportStatus = useCallback(async (reportId: string, newStatus: Report['status']) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/report/${reportId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            setReports(prev =>
                prev.map(report =>
                    report.id === reportId ? { ...report, status: newStatus } : report
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update report status! Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports])

    return {
        reports,
        loading,
        error,
        fetchReports,
        updateReportStatus
    }
}