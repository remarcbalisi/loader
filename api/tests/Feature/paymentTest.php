<?php

namespace Tests\Feature;

use App\Account;
use App\Payment;
use App\Sales;
use App\SalesPayment;
use App\UserNumber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class paymentTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $payments;
    protected $sales;
    protected $account;
    protected $user_number;
    protected $salesPayments;

    protected function setUp(): void
    {
        parent::setUp();
        $this->payments = create(Payment::class, [
            'amount' => 100,
        ], 10);
        $this->account = create(Account::class);
        $this->user_number = create(UserNumber::class);
        $this->sales = create(Sales::class, [
            'user_number_id' => $this->user_number->id,
            'account_id' => $this->account->id
        ], 10);
        $this->salesPayments = create(SalesPayment::class, [
            'amount' => 200,
            'sale_id' => $this->sales->first()->id,
            'payment_id' => $this->payments->first()->id,
        ], 5);
    }

    public function test_can_view_all_purchases() {
        $this->withoutExceptionHandling();
        $this->getJson(route('admin.payment.index'))
            ->assertJsonFragment([
                'id' => $this->payments->first()->id,
            ]);
    }

    public function test_can_view_all_sales_payment_thru_sale() {
        $this->withoutExceptionHandling();
        $this->getJson(route('admin.sales.payment.bysale', ['sale' => $this->sales->first()->id]))
            ->assertJsonFragment([
                'sale_id' => $this->sales->first()->id,
            ]);
    }
}
