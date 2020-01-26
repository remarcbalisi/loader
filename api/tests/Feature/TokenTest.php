<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class TokenTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');

        $credentials = [
            'username' => 'user',
            'password' => bcrypt('secret'),
            'email' => 'admin@gmail.com'
        ];

        $this->user = factory(\App\User::class)->create($credentials);
    }

    public function test_a_user_can_request_a_token_using_username()
    {
        $this->withoutExceptionHandling();

        $credentials = [
            'username' => 'user',
            'password' => 'secret',
        ];

        $this->post(route('request.token'), $credentials)->assertJsonStructure([
            'data' => [
                'token'
            ]
        ]);
    }
}
