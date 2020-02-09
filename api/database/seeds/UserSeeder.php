<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // admin
        $admin = User::create([
            'name' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'address' => $faker->address,
            'email_verified_at' => now(),
            'password' => bcrypt('secret'),
            'username' => 'admin',
            'remember_token' => Str::random(10),
        ]);

        $admin_role = Role::findByName('admin', 'api');

        $admin->assignRole($admin_role);
    }
}
