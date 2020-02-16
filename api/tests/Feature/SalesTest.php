<?php

namespace Tests\Feature;

use App\Account;
use App\Sales;
use App\UserNumber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SalesTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $account;
    protected $user_number;
    protected $sales;

    protected function setUp(): void
    {
        parent::setUp();
        $this->account = create(Account::class);
        $this->user_number = create(UserNumber::class);
        $this->sales = create(Sales::class, [
            'user_number_id' => $this->user_number->id,
            'account_id' => $this->account->id
        ], 10);
    }

    public function test_can_view_all_sales()
    {
        $this->withoutExceptionHandling();

        $this->getJson(route('admin.sales.index'))
            ->assertJsonFragment([
                'id' => $this->sales->first()->id
            ]);
    }

    public function test_can_view_a_sale()
    {
        $this->withoutExceptionHandling();

        $this->getJson(route('admin.sales.show', [
            'sale' => $this->sales->first()->id
        ]))
            ->assertJsonFragment([
                'id' => $this->sales->first()->id
            ]);
    }

    public function test_can_create_sale()
    {
        $this->withoutExceptionHandling();

        $data = [
            'user_number_id' => $this->user_number->id,
            'account_id' => $this->account->id,
            'amount' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 10),
        ];

        $this->postJson(route('admin.sales.store'), $data)
            ->assertJsonFragment([
                'user_number_id' => $data['user_number_id'],
                'account_id' => $data['account_id'],
                'amount' => $data['amount'],
            ]);
    }

    public function test_can_update_sale()
    {
        $this->withoutExceptionHandling();

        $data = [
            'user_number_id' => $this->user_number->id,
            'account_id' => $this->account->id,
            'amount' => 100,
        ];

        $this->patchJson(route('admin.sales.update', [
            'sale' => $this->sales->first()->id,
        ]), $data)
            ->assertJsonFragment([
                'user_number_id' => $data['user_number_id'],
                'account_id' => $data['account_id'],
                'amount' => $data['amount'],
            ]);
    }

    public function test_can_toggle_paid()
    {
        $this->withoutExceptionHandling();

        $this->patchJson(route('admin.sales.toggle.paid', [
            'sale' => $this->sales->first()->id,
        ]))
            ->assertJsonFragment([
                'is_paid' => true
            ]);
    }
}
