<?php

namespace Tests\Feature;

use App\Account;
use App\Purchase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PurchaseTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $account;
    protected $purchases;

    protected function setUp(): void
    {
        parent::setUp();
        $this->account = create(Account::class);
        $this->purchases = create(Purchase::class, [
            'account_id' => $this->account->id,
        ], 10);
    }

    public function test_can_view_all_purchases()
    {
        $this->withoutExceptionHandling();

        $this->getJson(route('admin.purchase.index'))
            ->assertJsonFragment([
                'id' => $this->purchases->first()->id,
            ]);
    }

    public function test_can_view_a_purchase()
    {
        $this->withoutExceptionHandling();

        $this->getJson(route('admin.purchase.show', [
            'purchase'=>$this->purchases->first()->id,
        ]))
            ->assertJsonFragment([
                'id' => $this->purchases->first()->id
            ]);
    }

    public function test_can_add_new_purchase()
    {
        $this->withoutExceptionHandling();

        $data = [
            'amount' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 10),
            'account_id' => $this->account->first()->id,
        ];

        $this->postJson(route('admin.purchase.store'), $data)
            ->assertJsonFragment([
                'amount' => $data['amount'],
                'account_id' => $data['account_id']
            ]);
    }

    public function test_can_update_purchase()
    {
        $this->withoutExceptionHandling();

        $data = [
            'amount' => 500.25,
            'account_id' => $this->account->first()->id,
        ];

        $this->patchJson(route('admin.purchase.update', [
            'purchase' => $this->purchases->first()->id
        ]), $data)
            ->assertJsonFragment([
                'amount' => $data['amount']
            ]);
    }
}
