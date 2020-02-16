<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesStoreRequest;
use App\Http\Requests\SalesUpdateRequest;
use App\Http\Resources\SalesCollection;
use App\Http\Resources\SalesResource;
use App\Sales;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        return (new SalesCollection(Sales::paginate()));
    }

    public function show(Sales $sale)
    {
        return (new SalesResource($sale));
    }

    public function store(SalesStoreRequest $request)
    {
        $new_sales = Sales::create($request->all());
        return (new SalesResource($new_sales));
    }

    public function update(SalesUpdateRequest $request, Sales $sale)
    {
        $sale->update($request->all());
        return (new SalesResource($sale));
    }
}
