<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new role column
            $table->enum('role', ['user', 'officer', 'admin'])->default('user')->after('phone');
            
            // Update existing users based on is_admin column
            // This will be done after the column is added
        });
        
        // Update existing data
        DB::table('users')->where('is_admin', true)->update(['role' => 'admin']);
        DB::table('users')->where('is_admin', false)->update(['role' => 'user']);
        
        // Drop the old is_admin column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Re-add is_admin column
            $table->boolean('is_admin')->default(false)->after('phone');
        });
        
        // Update data back to boolean
        DB::table('users')->where('role', 'admin')->update(['is_admin' => true]);
        DB::table('users')->whereIn('role', ['user', 'officer'])->update(['is_admin' => false]);
        
        // Drop role column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};