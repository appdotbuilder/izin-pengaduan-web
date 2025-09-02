import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

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

export default function ShowComplaint({ complaint }: Props) {
    const { auth } = usePage<{ auth: { user: { is_admin: boolean } } }>().props;
    const isAdmin = auth.user?.is_admin;

    return (
        <AppLayout>
            <Head title={`Pengaduan #${complaint.id}`} />
            
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={isAdmin ? route('admin.complaints.index') : route('complaints.index')}>
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                    </div>

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

                            {/* Complaint Details */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            PELAPOR
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                            {complaint.user.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {complaint.user.email}
                                        </p>
                                    </div>

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
                                            LOKASI
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                            📍 {complaint.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
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

                                    {complaint.attachment && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                LAMPIRAN
                                            </h3>
                                            <p className="mt-1">
                                                <a 
                                                    href={`/storage/${complaint.attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    📎 Lihat Lampiran
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                    DESKRIPSI MASALAH
                                </h3>
                                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                                    <p className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100">
                                        {complaint.description}
                                    </p>
                                </div>
                            </div>

                            {/* Admin Notes */}
                            {complaint.admin_notes && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                        CATATAN ADMIN
                                    </h3>
                                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                        <p className="whitespace-pre-wrap text-sm text-blue-900 dark:text-blue-100">
                                            {complaint.admin_notes}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Admin Actions */}
                            {isAdmin && (
                                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                        🛠️ Aksi Admin
                                    </h3>
                                    <UpdateStatusForm complaint={complaint} />
                                </div>
                            )}
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
        { value: 'pending', label: '⏳ Menunggu' },
        { value: 'in_progress', label: '🔄 Dalam Proses' },
        { value: 'completed', label: '✅ Selesai' },
        { value: 'rejected', label: '❌ Ditolak' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.complaints.update', complaint.id));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status Pengaduan
                    </label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Catatan Admin
                </label>
                <textarea
                    value={data.admin_notes}
                    onChange={(e) => setData('admin_notes', e.target.value)}
                    rows={3}
                    placeholder="Tambahkan catatan untuk pengaduan ini..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
                {errors.admin_notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.admin_notes}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? '⏳ Menyimpan...' : '💾 Perbarui Status'}
            </Button>
        </form>
    );
}