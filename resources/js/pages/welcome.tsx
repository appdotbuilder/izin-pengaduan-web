import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Pengaduan Izin">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-indigo-900 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-blue-200 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center lg:grow">
                    <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-center lg:gap-12">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-6">
                                <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-6xl dark:text-white">
                                    📋 Sistem Pengaduan Izin
                                </h1>
                                <p className="text-xl text-gray-600 lg:text-2xl dark:text-gray-300">
                                    Platform digital untuk mengajukan dan melacak pengaduan terkait perizinan
                                </p>
                            </div>
                            
                            {/* Features */}
                            <div className="mb-8 grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">📝</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Ajukan Pengaduan</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Formulir lengkap dengan lampiran</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">👀</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Lacak Status</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Monitor progress real-time</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">⚡</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Proses Cepat</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Penanganan yang efisien</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">🔒</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Aman & Privat</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Data terlindungi dengan baik</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                {auth.user ? (
                                    <Link
                                        href={route('complaints.create')}
                                        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                    >
                                        📝 Ajukan Pengaduan
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                        >
                                            🚀 Mulai Sekarang
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
                                        >
                                            👤 Masuk
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* Hero Visual */}
                        <div className="mt-12 flex-1 lg:mt-0">
                            <div className="relative mx-auto max-w-md">
                                {/* Mock App Interface */}
                                <div className="rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        
                                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                <div className="h-3 w-20 rounded bg-blue-300 dark:bg-blue-600"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/30">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                                <div className="h-3 w-24 rounded bg-yellow-300 dark:bg-yellow-600"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <div className="h-3 w-16 rounded bg-green-300 dark:bg-green-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}