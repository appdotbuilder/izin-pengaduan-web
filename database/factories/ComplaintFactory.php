<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complaint>
 */
class ComplaintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $permitTypes = [
            'Izin Usaha',
            'Izin Bangunan',
            'Izin Lingkungan',
            'Izin Keramaian',
            'Izin Perdagangan',
            'Izin Industri',
        ];

        $statuses = ['pending', 'in_progress', 'completed', 'rejected'];

        return [
            'user_id' => User::factory(),
            'permit_type' => fake()->randomElement($permitTypes),
            'description' => fake()->paragraphs(3, true),
            'incident_date' => fake()->dateTimeBetween('-30 days', 'now'),
            'location' => fake()->address(),
            'attachment' => fake()->boolean(30) ? 'documents/' . fake()->uuid() . '.pdf' : null,
            'status' => fake()->randomElement($statuses),
            'admin_notes' => fake()->boolean(60) ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the complaint is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'admin_notes' => null,
        ]);
    }

    /**
     * Indicate that the complaint is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
            'admin_notes' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the complaint is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'admin_notes' => 'Pengaduan telah selesai diproses.',
        ]);
    }
}