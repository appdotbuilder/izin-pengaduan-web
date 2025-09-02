import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    [key: string]: unknown;
}

interface Complaint {
    id: number;
    permit_type: string;
    description: string;
    incident_date: string;
    location: string;
    attachment: string | null;
    status: string;
    status_label: string;
    status_color: string;
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
    user: User;
    [key: string]: unknown;
}

interface Props {
    complaint: Complaint;
    [key: string]: unknown;
}

export default function AdminShowComplaint({ complaint }: Props) {
    return (
        <AppLayout>
            <Head title={`Kelola Pengaduan #${complaint.id}`} />
            
            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('admin.complaints.index')}>
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    {/* Header */}
                                    <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                                    Pengaduan #{complaint.id}
                                                </h1>
                                                <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                                                    {complaint.permit_type}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-4 py-2 text-sm font-medium ${complaint.status_color}`}>
                                                {complaint.status_label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                DESKRIPSI MASALAH
                                            </h3>
                                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                                                <p className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100">
                                                    {complaint.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    TANGGAL KEJADIAN
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    📅 {new Date(complaint.incident_date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    LOKASI KEJADIAN
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    📍 {complaint.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    TANGGAL PENGADUAN
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    🕒 {new Date(complaint.created_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    TERAKHIR DIPERBARUI
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    🔄 {new Date(complaint.updated_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>

                                        {complaint.attachment && (
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                    LAMPIRAN
                                                </h3>
                                                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                                    <a 
                                                        href={`/storage/${complaint.attachment}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        📎 Buka Lampiran
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {complaint.admin_notes && (
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                    CATATAN ADMIN SAAT INI
                                                </h3>
                                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                                    <p className="whitespace-pre-wrap text-sm text-blue-900 dark:text-blue-100">
                                                        {complaint.admin_notes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* User Info */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        👤 Informasi Pelapor
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama</p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">{complaint.user.name}</p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                <a href={`mailto:${complaint.user.email}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                                    {complaint.user.email}
                                                </a>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Telepon</p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                <a href={`tel:${complaint.user.phone}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                                    {complaint.user.phone}
                                                </a>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alamat</p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">{complaint.user.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Update Status Form */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        🛠️ Kelola Status
                                    </h3>
                                    
                                    <UpdateStatusForm complaint={complaint} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function UpdateStatusForm({ complaint }: { complaint: Complaint }) {
    const { data, setData, patch, processing, errors } = useForm({
        status: complaint.status,
        admin_notes: complaint.admin_notes || '',
    });

    const statusOptions = [
        { value: 'pending', label: '⏳ Menunggu', color: 'text-yellow-600' },
        { value: 'in_progress', label: '🔄 Dalam Proses', color: 'text-blue-600' },
        { value: 'completed', label: '✅ Selesai', color: 'text-green-600' },
        { value: 'rejected', label: '❌ Ditolak', color: 'text-red-600' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.complaints.update', complaint.id), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status Pengaduan
                </label>
                <div className="space-y-2">
                    {statusOptions.map((option) => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                value={option.value}
                                checked={data.status === option.value}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mr-3 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className={`text-sm ${option.color}`}>
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
                {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catatan Admin
                </label>
                <textarea
                    value={data.admin_notes}
                    onChange={(e) => setData('admin_notes', e.target.value)}
                    rows={4}
                    placeholder="Tambahkan catatan untuk memberikan informasi kepada pelapor..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
                <div className="mt-1 text-sm text-gray-500">
                    {data.admin_notes.length}/1000 karakter
                </div>
                {errors.admin_notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.admin_notes}</p>
                )}
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                {processing ? '⏳ Menyimpan...' : '💾 Perbarui Status dan Catatan'}
            </Button>
        </form>
    );
}