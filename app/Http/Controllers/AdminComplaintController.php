<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateComplaintStatusRequest;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminComplaintController extends Controller
{
    /**
     * Display a listing of all complaints for admin.
     */
    public function index(Request $request)
    {
        // Check admin or officer access
        if (!auth()->check() || !auth()->user()->canManageComplaints()) {
            abort(403, 'Unauthorized action.');
        }

        $query = Complaint::with('user')->latest();

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('permit_type', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $complaints = $query->paginate(15);

        return Inertia::render('admin/complaints/index', [
            'complaints' => $complaints,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ]
        ]);
    }

    /**
     * Display the specified complaint for admin.
     */
    public function show(Complaint $complaint)
    {
        // Check admin or officer access
        if (!auth()->check() || !auth()->user()->canManageComplaints()) {
            abort(403, 'Unauthorized action.');
        }

        $complaint->load('user');

        return Inertia::render('admin/complaints/show', [
            'complaint' => $complaint
        ]);
    }

    /**
     * Update the complaint status and notes.
     */
    public function update(UpdateComplaintStatusRequest $request, Complaint $complaint)
    {
        $complaint->update($request->validated());

        return redirect()->route('admin.complaints.show', $complaint)
            ->with('success', 'Status pengaduan berhasil diperbarui.');
    }
}