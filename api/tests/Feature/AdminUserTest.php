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
}
