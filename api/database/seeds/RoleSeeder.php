<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'admin', 'guard_name' => 'api']);
        Role::create(['name' => 'agent', 'guard_name' => 'api']);
        Role::create(['name' => 'direct', 'guard_name' => 'api']);
    }
}
