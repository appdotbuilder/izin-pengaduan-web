<?php

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('user can view complaints index', function () {
    $user = User::factory()->create();
    $complaints = Complaint::factory(3)->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->get(route('complaints.index'))
        ->assertOk();
});

test('user can create complaint', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $file = UploadedFile::fake()->create('document.pdf', 1024);

    $complaintData = [
        'permit_type' => 'Izin Usaha',
        'description' => 'Test complaint description',
        'incident_date' => '2024-01-15',
        'location' => 'Jakarta',
        'attachment' => $file,
    ];

    $this->actingAs($user)
        ->post(route('complaints.store'), $complaintData)
        ->assertRedirect();
    
    $complaint = $user->complaints()->first();
    
    $this->assertDatabaseHas('complaints', [
        'user_id' => $user->id,
        'permit_type' => 'Izin Usaha',
        'description' => 'Test complaint description',
        'location' => 'Jakarta',
        'status' => 'pending',
    ]);

    if ($complaint->attachment) {
        Storage::disk('public')->assertExists($complaint->attachment);
    }
});

test('user can view own complaint', function () {
    $user = User::factory()->create();
    $complaint = Complaint::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->get(route('complaints.show', $complaint))
        ->assertOk();
});

test('user cannot view other users complaint', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $complaint = Complaint::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user)
        ->get(route('complaints.show', $complaint))
        ->assertForbidden();
});

test('admin can view all complaints', function () {
    $admin = User::factory()->admin()->create();
    $complaints = Complaint::factory(5)->create();

    $this->actingAs($admin)
        ->get(route('admin.complaints.index'))
        ->assertOk();
});

test('admin can update complaint status', function () {
    $admin = User::factory()->admin()->create();
    $complaint = Complaint::factory()->create(['status' => 'pending']);

    $this->actingAs($admin)
        ->patch(route('admin.complaints.update', $complaint), [
            'status' => 'in_progress',
            'admin_notes' => 'Processing the complaint',
        ])
        ->assertRedirect();
    
    $this->assertDatabaseHas('complaints', [
        'id' => $complaint->id,
        'status' => 'in_progress',
        'admin_notes' => 'Processing the complaint',
    ]);
});

test('non admin cannot access admin routes', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.complaints.index'))
        ->assertForbidden();
});