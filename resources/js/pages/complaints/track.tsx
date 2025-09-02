import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    complaint: Complaint;
}

export default function TrackComplaint({ complaint }: Props) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'in_progress':
                return '🔄';
            case 'completed':
                return '✅';
            case 'rejected':
                return '❌';
            default:
                return '❓';
        }
    };

    const getStatusDescription = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pengaduan Anda sedang menunggu review dari tim kami.';
            case 'in_progress':
                return 'Pengaduan Anda sedang diproses dan ditindaklanjuti.';
            case 'completed':
                return 'Pengaduan Anda telah selesai diproses.';
            case 'rejected':
                return 'Pengaduan Anda tidak dapat diproses. Silakan periksa catatan admin.';
            default:
                return 'Status tidak diketahui.';
        }
    };

    return (
        <>
            <Head title={`Lacak Pengaduan #${complaint.id}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-gray-900 dark:to-indigo-900">
                {/* Header */}
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                🔍 Lacak Pengaduan
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Detail dan status pengaduan Anda
                            </p>
                        </div>
                        <Link href="/">
                            <Button variant="outline">
                                🏠 Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>

                    {/* Status Overview */}
                    <Card className="mb-6 border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <span className="text-2xl">{getStatusIcon(complaint.status)}</span>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span>Pengaduan #{complaint.id}</span>
                                        <Badge className={complaint.status_color}>
                                            {complaint.status_label}
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                        {getStatusDescription(complaint.status)}
                                    </p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Details */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        📋 Detail Pengaduan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Jenis Izin
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{complaint.permit_type}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Deskripsi Masalah
                                        </label>
                                        <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
                                            {complaint.description}
                                        </p>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Tanggal Kejadian
                                            </label>
                                            <p className="text-gray-900 dark:text-white">
                                                {new Date(complaint.incident_date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Lokasi
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{complaint.location}</p>
                                        </div>
                                    </div>

                                    {complaint.attachment && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Lampiran
                                            </label>
                                            <div className="mt-2">
                                                <a
                                                    href={`/storage/${complaint.attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                                >
                                                    📎 Lihat Lampiran
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {complaint.admin_notes && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Catatan dari Admin
                                            </label>
                                            <div className="mt-2 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                                                <p className="whitespace-pre-wrap text-amber-800 dark:text-amber-200">
                                                    {complaint.admin_notes}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Timeline & Info */}
                        <div className="space-y-6">
                            {/* Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        📅 Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500"></div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Pengaduan Diajukan
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {new Date(complaint.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1.5 h-2 w-2 rounded-full ${
                                                ['in_progress', 'completed', 'rejected'].includes(complaint.status) 
                                                    ? 'bg-blue-500' 
                                                    : 'bg-gray-300'
                                            }`}></div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Sedang Diproses
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {['in_progress', 'completed', 'rejected'].includes(complaint.status)
                                                        ? 'Dalam progress'
                                                        : 'Menunggu review'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1.5 h-2 w-2 rounded-full ${
                                                ['completed', 'rejected'].includes(complaint.status) 
                                                    ? (complaint.status === 'completed' ? 'bg-green-500' : 'bg-red-500')
                                                    : 'bg-gray-300'
                                            }`}></div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {complaint.status === 'completed' ? 'Selesai' : 
                                                     complaint.status === 'rejected' ? 'Ditolak' : 'Penyelesaian'}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {['completed', 'rejected'].includes(complaint.status)
                                                        ? 'Pengaduan telah diproses'
                                                        : 'Menunggu penyelesaian'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pengaju Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        👤 Informasi Pengaju
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Nama
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{complaint.user.name}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Help Section */}
                            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        💡 Butuh Bantuan?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                                        Jika Anda memiliki pertanyaan tentang pengaduan ini, silakan hubungi kami.
                                    </p>
                                    <Link href="/">
                                        <Button variant="outline" size="sm" className="w-full">
                                            📞 Hubungi Kami
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}