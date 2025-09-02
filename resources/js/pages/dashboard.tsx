import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    total_complaints: number;
    pending_complaints: number;
    in_progress_complaints: number;
    completed_complaints: number;
    recent_complaints?: Array<{
        id: number;
        permit_type: string;
        status: string;
        status_label: string;
        status_color: string;
        created_at: string;
    }>;
}

interface Props {
    stats?: DashboardStats;
    [key: string]: unknown;
}

export default function Dashboard({ stats }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user && 'is_admin' in auth.user ? auth.user.is_admin : false;

    if (isAdmin) {
        return <AdminDashboard stats={stats} />;
    }

    return <UserDashboard stats={stats} />;
}

function AdminDashboard({ stats }: { stats?: DashboardStats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold">🛠️ Dashboard Admin</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Kelola sistem pengaduan izin
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">📊</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                Total Pengaduan
                                            </p>
                                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                {stats?.total_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">⏳</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                                Menunggu
                                            </p>
                                            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                                                {stats?.pending_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">🔄</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                Dalam Proses
                                            </p>
                                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                {stats?.in_progress_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">✅</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                Selesai
                                            </p>
                                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                                {stats?.completed_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold">⚡ Aksi Cepat</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <Link href={route('admin.complaints.index')}>
                                        <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                                            <div className="flex items-center">
                                                <div className="text-2xl">📋</div>
                                                <div className="ml-3">
                                                    <h3 className="font-semibold">Kelola Pengaduan</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Lihat dan kelola semua pengaduan
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={route('admin.complaints.index', { status: 'pending' })}>
                                        <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                                            <div className="flex items-center">
                                                <div className="text-2xl">⚠️</div>
                                                <div className="ml-3">
                                                    <h3 className="font-semibold">Pengaduan Menunggu</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Proses pengaduan yang baru masuk
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={route('admin.complaints.index', { status: 'in_progress' })}>
                                        <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                                            <div className="flex items-center">
                                                <div className="text-2xl">🔄</div>
                                                <div className="ml-3">
                                                    <h3 className="font-semibold">Sedang Proses</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Pantau pengaduan yang sedang diproses
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            {stats?.recent_complaints && stats.recent_complaints.length > 0 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold">🕒 Pengaduan Terbaru</h2>
                                    <div className="space-y-3">
                                        {stats.recent_complaints.map((complaint) => (
                                            <div 
                                                key={complaint.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900"
                                            >
                                                <div>
                                                    <p className="font-medium">#{complaint.id} - {complaint.permit_type}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {new Date(complaint.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${complaint.status_color}`}>
                                                    {complaint.status_label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function UserDashboard({ stats }: { stats?: DashboardStats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold">📋 Dashboard Pengaduan</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Kelola pengaduan izin Anda
                                </p>
                            </div>

                            {/* User Stats */}
                            <div className="mb-8 grid gap-6 md:grid-cols-3">
                                <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">📊</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                Total Pengaduan
                                            </p>
                                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                {stats?.total_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">⏳</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                                Dalam Proses
                                            </p>
                                            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                                                {((stats?.pending_complaints || 0) + (stats?.in_progress_complaints || 0))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                                    <div className="flex items-center">
                                        <div className="text-3xl">✅</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                Selesai
                                            </p>
                                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                                {stats?.completed_complaints || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold">⚡ Aksi Cepat</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <Link href={route('complaints.create')}>
                                        <div className="rounded-lg border-2 border-dashed border-blue-300 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20">
                                            <div className="text-4xl mb-3">➕</div>
                                            <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                                                Ajukan Pengaduan
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Buat pengaduan baru
                                            </p>
                                        </div>
                                    </Link>

                                    <Link href={route('complaints.index')}>
                                        <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                                            <div className="flex items-center">
                                                <div className="text-2xl">📋</div>
                                                <div className="ml-3">
                                                    <h3 className="font-semibold">Lihat Pengaduan</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Pantau status pengaduan Anda
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-900">
                                        <div className="flex items-center">
                                            <div className="text-2xl">📞</div>
                                            <div className="ml-3">
                                                <h3 className="font-semibold">Bantuan</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Hubungi kami jika ada masalah
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Panel */}
                            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                                <div className="flex items-start">
                                    <div className="text-blue-500 text-2xl">💡</div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            Tips Menggunakan Sistem
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                                            <li>Pastikan semua informasi pengaduan diisi dengan lengkap dan akurat</li>
                                            <li>Lampirkan dokumen pendukung jika diperlukan (maks. 5MB)</li>
                                            <li>Pantau status pengaduan Anda secara berkala</li>
                                            <li>Pengaduan akan diproses dalam 1-3 hari kerja</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}