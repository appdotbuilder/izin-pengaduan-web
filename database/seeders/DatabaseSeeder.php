<?php

namespace Database\Seeders;

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@pengaduan.test',
            'address' => 'Jl. Pemerintahan No. 1, Jakarta',
            'phone' => '021-12345678',
            'role' => 'admin',
        ]);

        // Create officer user
        $officer = User::factory()->create([
            'name' => 'Petugas Pengaduan',
            'email' => 'officer@pengaduan.test',
            'address' => 'Jl. Pelayanan No. 2, Jakarta',
            'phone' => '021-87654321',
            'role' => 'officer',
        ]);

        // Create regular users
        $users = User::factory(10)->create();

        // Create complaints for regular users
        foreach ($users as $user) {
            Complaint::factory(random_int(1, 5))->create([
                'user_id' => $user->id,
            ]);
        }

        // Create some additional complaints with specific statuses for demo
        Complaint::factory(3)->pending()->create([
            'user_id' => $users->random()->id,
        ]);
        
        Complaint::factory(2)->inProgress()->create([
            'user_id' => $users->random()->id,
        ]);
        
        Complaint::factory(5)->completed()->create([
            'user_id' => $users->random()->id,
        ]);
    }
}