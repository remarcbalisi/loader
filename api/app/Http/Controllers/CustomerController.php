<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return (new CustomerCollection(Customer::get()));
    }

    public function store(CustomerStoreRequest $request)
    {
        $new_customer = Customer::create($request->all());
        return (new CustomerResource($new_customer));
    }

    public function update(CustomerUpdateRequest $request, Customer $customer)
    {
        $customer->update($request->all());
        return (new CustomerResource($customer));
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return $this->index();
    }
}
