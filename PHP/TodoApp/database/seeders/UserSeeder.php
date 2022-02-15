<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                'name' => 'watanabe',
                'email' => 'watanabe@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                'name' => 'cocomi',
                'email' => 'cocomi@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
