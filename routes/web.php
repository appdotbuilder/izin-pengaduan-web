<?php

use App\Http\Controllers\AdminComplaintController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public complaint tracking route (no authentication required)
Route::get('/track/{complaint}', [\App\Http\Controllers\PublicComplaintController::class, 'show'])->name('complaints.track');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->canManageComplaints()) {
            // Admin dashboard statistics
            $stats = [
                'total_complaints' => \App\Models\Complaint::count(),
                'pending_complaints' => \App\Models\Complaint::where('status', 'pending')->count(),
                'in_progress_complaints' => \App\Models\Complaint::where('status', 'in_progress')->count(),
                'completed_complaints' => \App\Models\Complaint::where('status', 'completed')->count(),
                'recent_complaints' => \App\Models\Complaint::with('user')
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(function ($complaint) {
                        return [
                            'id' => $complaint->id,
                            'permit_type' => $complaint->permit_type,
                            'status' => $complaint->status,
                            'status_label' => $complaint->status_label,
                            'status_color' => $complaint->status_color,
                            'created_at' => $complaint->created_at,
                        ];
                    }),
            ];
        } else {
            // User dashboard statistics
            $stats = [
                'total_complaints' => $user->complaints()->count(),
                'pending_complaints' => $user->complaints()->where('status', 'pending')->count(),
                'in_progress_complaints' => $user->complaints()->where('status', 'in_progress')->count(),
                'completed_complaints' => $user->complaints()->where('status', 'completed')->count(),
            ];
        }
        
        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    })->name('dashboard');
    
    // User complaint routes
    Route::resource('complaints', ComplaintController::class)->except(['edit', 'update', 'destroy']);
    
    // Admin complaint management routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('complaints', [AdminComplaintController::class, 'index'])->name('complaints.index');
        Route::get('complaints/{complaint}', [AdminComplaintController::class, 'show'])->name('complaints.show');
        Route::patch('complaints/{complaint}', [AdminComplaintController::class, 'update'])->name('complaints.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
