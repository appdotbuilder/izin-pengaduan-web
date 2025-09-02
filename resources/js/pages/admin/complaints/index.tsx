import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: unknown;
}

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
    user: User;
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

interface Filters {
    status: string;
    search: string;
}

interface Props {
    complaints: PaginatedComplaints;
    filters: Filters;
    [key: string]: unknown;
}

export default function AdminComplaintsIndex({ complaints, filters }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search);
    const [statusFilter, setStatusFilter] = React.useState(filters.status);

    const handleFilter = () => {
        router.get(route('admin.complaints.index'), {
            status: statusFilter,
            search: searchTerm,
        }, {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setSearchTerm('');
        setStatusFilter('all');
        router.get(route('admin.complaints.index'));
    };

    const statusOptions = [
        { value: 'all', label: '🔍 Semua Status' },
        { value: 'pending', label: '⏳ Menunggu' },
        { value: 'in_progress', label: '🔄 Dalam Proses' },
        { value: 'completed', label: '✅ Selesai' },
        { value: 'rejected', label: '❌ Ditolak' },
    ];

    return (
        <AppLayout>
            <Head title="Kelola Pengaduan - Admin" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold">🛠️ Kelola Pengaduan</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Kelola dan pantau semua pengaduan yang masuk
                                </p>
                            </div>

                            {/* Filters */}
                            <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Cari Pengaduan
                                        </label>
                                        <Input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Cari berdasarkan jenis izin, deskripsi, lokasi, atau nama pelapor..."
                                            className="mt-1"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Filter Status
                                        </label>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Button onClick={handleFilter}>
                                            🔍 Cari
                                        </Button>
                                        <Button variant="outline" onClick={handleReset}>
                                            🔄 Reset
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
                                <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                                    <div className="flex items-center">
                                        <div className="text-2xl">⏳</div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                                Menunggu
                                            </p>
                                            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                                                {complaints.data.filter(c => c.status === 'pending').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="flex items-center">
                                        <div className="text-2xl">🔄</div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                Dalam Proses
                                            </p>
                                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                {complaints.data.filter(c => c.status === 'in_progress').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="flex items-center">
                                        <div className="text-2xl">✅</div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                                Selesai
                                            </p>
                                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                                {complaints.data.filter(c => c.status === 'completed').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                                    <div className="flex items-center">
                                        <div className="text-2xl">❌</div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                                Ditolak
                                            </p>
                                            <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                                                {complaints.data.filter(c => c.status === 'rejected').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Complaints List */}
                            {complaints.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📋</div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                        Tidak ada pengaduan
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {filters.search || filters.status !== 'all' 
                                            ? 'Tidak ada pengaduan yang sesuai dengan filter.'
                                            : 'Belum ada pengaduan yang masuk.'}
                                    </p>
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
                                                            #{complaint.id} - {complaint.permit_type}
                                                        </h3>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${complaint.status_color}`}>
                                                            {complaint.status_label}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="mb-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                                                        {complaint.description}
                                                    </p>
                                                    
                                                    <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-500 sm:flex-row sm:gap-4">
                                                        <span>👤 {complaint.user.name}</span>
                                                        <span>📍 {complaint.location}</span>
                                                        <span>📅 {new Date(complaint.incident_date).toLocaleDateString('id-ID')}</span>
                                                        <span>🕒 {new Date(complaint.created_at).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-4">
                                                    <Link href={route('admin.complaints.show', complaint.id)}>
                                                        <Button size="sm">
                                                            🛠️ Kelola
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