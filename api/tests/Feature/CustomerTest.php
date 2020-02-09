<?php

namespace Tests\Feature;

use App\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $customers;

    public function setUp(): void
    {
        parent::setUp();
        $this->customers = create(Customer::class, [], 10);
    }

    public function test_get_all_customers()
    {
        $this->withoutExceptionHandling();

        $this->getJson(route('customer.index'))
            ->assertJsonFragment([
                "id" => $this->customers->first()->id,
            ]);
    }

    public function test_create_a_customer()
    {
        $this->withoutExceptionHandling();

        $data = [
            'name' => 'customer name',
            'address' => 'customer address',
            'type' => 'agent'
        ];

        $this->postJson(route('customer.store'), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }

    public function test_update_a_customer()
    {
        $this->withoutExceptionHandling();

        $data = [
            'name' => 'updated customer name',
            'address' => 'customer address',
            'type' => 'agent'
        ];

        $this->patchJson(route('customer.update', [
            'customer' => $this->customers->first()
        ]), $data)
            ->assertJsonFragment([
                'name' => $data['name']
            ]);
    }

    public function test_delete_a_customer()
    {
        $this->withoutExceptionHandling();

        $this->deleteJson(route('customer.destroy', [
            'customer' => $this->customers->first()
        ]))
            ->assertJsonFragment([
                'id' => $this->customers->skip(1)->first()->id
            ]);
    }
}
