<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_get_all_users()
    {
        $response = $this->get(route('admin.users'));
        $response->assertStatus(200);
    }
}
