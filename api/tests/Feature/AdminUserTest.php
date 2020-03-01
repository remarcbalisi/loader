<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AdminUserTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $admin;

    public function setUp(): void
    {
        parent::setUp();
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        Role::create(['name' => 'agent', 'guard_name' => 'api']);
        Role::create(['name' => 'direct', 'guard_name' => 'api']);
        $this->admin = create(User::class, ['email' => 'admin@gmail.com']);
        $this->admin->assignRole($adminRole);
    }

    public function test_admin_user_can_view_all_users()
    {
        $this->withoutExceptionHandling();
        $this->actingAs($this->admin, 'api');

        $this->getJson(route('admin.user.index'))
            ->assertJsonFragment([
                "id" => $this->admin->id,
            ]);
    }

    public function test_admin_can_add_new_user()
    {
        $this->withoutExceptionHandling();
        $this->actingAs($this->admin, 'api');
        $data = [
            'name' => 'user',
            'email' => 'user@email.com',
            'password' => 'secret',
            'role' => 'direct',
            'address' => $this->faker->address,
        ];

        $this->postJson(route('admin.user.store'), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }

    public function test_admin_cannot_add_duplicate_email()
    {
        $this->actingAs($this->admin, 'api');
        $data = [
            'name' => 'user',
            'email' => 'admin@gmail.com',
            'password' => 'secret',
            'role' => 'direct',
            'address' => $this->faker->address,
        ];

        $this->postJson(route('admin.user.store'), $data)
            ->assertJsonFragment([
                'errors' => [
                    'email' => ['The email has already been taken.']
                ]
            ]);
    }

    public function test_admin_can_update_user()
    {
        $this->withoutExceptionHandling();
        $this->actingAs($this->admin, 'api');
        $user = create(User::class);

        $data = [
            'name' => 'updated_name',
            'email' => 'user@email.com',
            'password' => 'secret',
            'role' => 'direct',
            'address' => $this->faker->address,
        ];

        $this->patchJson(route('admin.user.update', ['user'=>$user]), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }

    public function test_admin_can_update_user_with_same_email()
    {
        $this->actingAs($this->admin, 'api');
        $user = create(User::class, ['email' => 'same@email.com']);

        $data = [
            'name' => 'updated_name',
            'email' => 'same@email.com',
            'password' => 'secret',
            'role' => 'direct',
            'address' => $this->faker->address,
        ];

        $this->patchJson(route('admin.user.update', ['user'=>$user]), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }
}
