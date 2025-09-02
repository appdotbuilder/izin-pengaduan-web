<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComplaintRequest;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the user's complaints.
     */
    public function index()
    {
        $complaints = auth()->user()->complaints()
            ->latest()
            ->paginate(10);

        return Inertia::render('complaints/index', [
            'complaints' => $complaints
        ]);
    }

    /**
     * Show the form for creating a new complaint.
     */
    public function create()
    {
        return Inertia::render('complaints/create');
    }

    /**
     * Store a newly created complaint.
     */
    public function store(StoreComplaintRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = auth()->id();

        // Handle file upload if present
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('complaints', $filename, 'public');
            $validatedData['attachment'] = $path;
        }

        $complaint = Complaint::create($validatedData);

        return redirect()->route('complaints.show', $complaint)
            ->with('success', 'Pengaduan berhasil diajukan.');
    }

    /**
     * Display the specified complaint.
     */
    public function show(Complaint $complaint)
    {
        // Ensure user can only view their own complaints unless they're admin
        if (!auth()->user()->is_admin && $complaint->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $complaint->load('user');

        return Inertia::render('complaints/show', [
            'complaint' => $complaint
        ]);
    }
}