<?php

namespace Tests\Feature;

use App\User;
use App\UserNumber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserNumberTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $userNumbers;
    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = create(User::class);
        $this->userNumbers = create(UserNumber::class, [
            'number' => $this->faker->phoneNumber,
            'user_id' => $this->user->first()->id,
        ], 3);
    }


    public function test_add_user_number()
    {
        $user = create(User::class);

        $data = [
            'number' => $this->faker->phoneNumber,
            'user_id' => $user->first()->id,
        ];

        $this->postJson(route('admin.user-number.store'), $data)
            ->assertJsonStructure([
                'data' => [
                    'number',
                    'user' => [
                        'id'
                    ],
                ]
            ]);
    }

    public function test_view_all_user_number()
    {
        $this->withoutExceptionHandling();
        $this->getJson(route('admin.user-number.index'))
            ->assertJsonFragment([
                'id' => $this->userNumbers->first()->id,
            ]);
    }

    public function test_view_a_user_number()
    {
        $this->withoutExceptionHandling();
        $this->getJson(route('admin.user-number.show', [
            'user_number' => $this->userNumbers->first()->id,
        ]))->assertJsonFragment([
            'id' => $this->userNumbers->first()->id
        ]);
    }

    public function test_update_a_user_number()
    {
        $this->withoutExceptionHandling();

        $data = [
            'number' => 'test new number',
            'user_id' => $this->user->first()->id,
        ];

        $this->patchJson(route('admin.user-number.update', [
            'user_number' => $this->userNumbers->first()->id,
        ]), $data)
            ->assertJsonFragment([
                'number' => $data['number']
            ]);
    }
}
