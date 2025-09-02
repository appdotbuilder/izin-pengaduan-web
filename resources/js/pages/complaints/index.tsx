import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Complaint {
    id: number;
    permit_type: string;
    description: string;
    incident_date: string;
    location: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
    [key: string]: unknown;
}

interface PaginatedComplaints {
    data: Complaint[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    [key: string]: unknown;
}

interface Props {
    complaints: PaginatedComplaints;
    [key: string]: unknown;
}

export default function ComplaintsIndex({ complaints }: Props) {
    return (
        <AppLayout>
            <Head title="Pengaduan Saya" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-2xl font-bold">📋 Pengaduan Saya</h1>
                                <Link href={route('complaints.create')}>
                                    <Button>
                                        ➕ Ajukan Pengaduan
                                    </Button>
                                </Link>
                            </div>

                            {complaints.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                        Belum ada pengaduan
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Anda belum mengajukan pengaduan apapun.
                                    </p>
                                    <Link href={route('complaints.create')}>
                                        <Button>Ajukan Pengaduan Pertama</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {complaints.data.map((complaint) => (
                                        <div
                                            key={complaint.id}
                                            className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center gap-3">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {complaint.permit_type}
                                                        </h3>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${complaint.status_color}`}>
                                                            {complaint.status_label}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="mb-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                                                        {complaint.description}
                                                    </p>
                                                    
                                                    <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-500 sm:flex-row sm:gap-4">
                                                        <span>📍 {complaint.location}</span>
                                                        <span>📅 {new Date(complaint.incident_date).toLocaleDateString('id-ID')}</span>
                                                        <span>🕒 {new Date(complaint.created_at).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-4">
                                                    <Link href={route('complaints.show', complaint.id)}>
                                                        <Button variant="outline" size="sm">
                                                            👁️ Lihat Detail
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {complaints.links && complaints.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex space-x-1">
                                        {complaints.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`rounded px-3 py-1 text-sm ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}