import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';



export default function CreateComplaint() {
    const { data, setData, post, processing, errors } = useForm({
        permit_type: '',
        description: '',
        incident_date: '',
        location: '',
        attachment: null as File | null,
    });

    const permitTypes = [
        'Izin Usaha',
        'Izin Bangunan',
        'Izin Lingkungan',
        'Izin Keramaian',
        'Izin Perdagangan',
        'Izin Industri',
        'Lainnya',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('complaints.store'));
    };

    return (
        <AppLayout>
            <Head title="Ajukan Pengaduan" />
            
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="mb-6 text-2xl font-bold">📝 Ajukan Pengaduan Baru</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="permit_type">Jenis Izin *</Label>
                                    <select
                                        id="permit_type"
                                        value={data.permit_type}
                                        onChange={(e) => setData('permit_type', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        required
                                    >
                                        <option value="">Pilih jenis izin</option>
                                        {permitTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.permit_type} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="description">Deskripsi Masalah *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Jelaskan masalah atau keluhan Anda terkait izin tersebut..."
                                        rows={4}
                                        required
                                        className="mt-1"
                                    />
                                    <div className="mt-1 text-sm text-gray-500">
                                        {data.description.length}/2000 karakter
                                    </div>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="incident_date">Tanggal Kejadian *</Label>
                                    <Input
                                        id="incident_date"
                                        type="date"
                                        value={data.incident_date}
                                        onChange={(e) => setData('incident_date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                        className="mt-1"
                                    />
                                    <InputError message={errors.incident_date} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="location">Lokasi *</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Alamat lengkap lokasi kejadian"
                                        required
                                        className="mt-1"
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="attachment">Lampiran (Opsional)</Label>
                                    <Input
                                        id="attachment"
                                        type="file"
                                        onChange={(e) => setData('attachment', e.target.files?.[0] || null)}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        className="mt-1"
                                    />
                                    <div className="mt-1 text-sm text-gray-500">
                                        Format: PDF, DOC, DOCX, JPG, JPEG, PNG (Maks. 5MB)
                                    </div>
                                    <InputError message={errors.attachment} className="mt-2" />
                                </div>

                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="flex">
                                        <div className="text-blue-400">
                                            ℹ️
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                Informasi Penting
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li>Pengaduan akan diproses dalam 1-3 hari kerja</li>
                                                    <li>Anda akan mendapat notifikasi jika ada perubahan status</li>
                                                    <li>Pastikan semua informasi yang diberikan akurat</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? '⏳ Mengirim...' : '📤 Kirim Pengaduan'}
                                    </Button>
                                    
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        ↩️ Batal
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}