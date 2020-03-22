<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesStoreRequest;
use App\Http\Requests\SalesUpdateRequest;
use App\Http\Resources\SalesCollection;
use App\Http\Resources\SalesResource;
use App\Sales;
use App\UserNumber;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $sales = Sales::with('account')->get()->toArray();

        foreach ($sales as $k => $v)
        {
            $v['account_name'] = $v['account']['name'].'|'.$v['account']['number'];
            unset($v['account']);

            $number = UserNumber::with('user')
                        ->where('id', $v['user_number_id'])
                        ->first();
            $v['customer_name'] = $number['user']['name'];
            $v['customer_number'] = $number['number'];

            $sales[$k] = $v;
        }

        return response()->json($sales , 200);
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
