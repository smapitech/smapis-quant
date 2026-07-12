<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'demo@smapisquant.ai'],
            [
                'name' => 'Isaac Olapade',
                'password' => 'Demo12345!',
                'account_type' => 'individual_trader',
                'country' => 'Nigeria',
            ],
        );

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'Password123!',
                'account_type' => 'developer',
                'country' => 'United States',
            ],
        );
    }
}
