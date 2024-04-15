<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Make sure to import the User model

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@esoft.com',
            'password' => bcrypt('admin'), // Replace 'password' with the desired password
            'is_admin' => 1,
        ]);
    }
}
