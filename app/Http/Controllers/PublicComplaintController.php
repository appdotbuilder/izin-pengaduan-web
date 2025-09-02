<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Inertia\Inertia;

class PublicComplaintController extends Controller
{
    /**
     * Display complaint details for public tracking.
     */
    public function show(Complaint $complaint)
    {
        $complaint->load('user:id,name');

        return Inertia::render('complaints/track', [
            'complaint' => $complaint
        ]);
    }
}