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
        $this->admin = create(User::class);
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
            'password' => 'secret'
        ];

        $this->postJson(route('admin.user.store'), $data)
            ->assertJsonFragment([
                'name' => $data['name']
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
            'password' => 'secret'
        ];

        $this->patchJson(route('admin.user.update', ['user'=>$user]), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }
}
