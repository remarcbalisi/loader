<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseStoreRequest;
use App\Http\Requests\PurchaseUpdateRequest;
use App\Http\Resources\PurchaseCollection;
use App\Http\Resources\PurchaseResource;
use App\Purchase;
use App\Account;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with('account')->get()->toArray();
        foreach ($purchases as $k => $v) {
            $purchases[$k]['account_name'] = $v['account']['name'];
            $purchases[$k]['account_number'] = $v['account']['number'];
        }
        return response()->json($purchases , 200);
    }

    public function show(Purchase $purchase)
    {
        return (new PurchaseResource($purchase));
    }

    public function store(PurchaseStoreRequest $request)
    {
        $new_purchase = Purchase::create($request->all());
        Account::updateBalance($new_purchase->account_id, floatval($new_purchase->amount));
        return (new PurchaseResource($new_purchase));
    }

    public function update(PurchaseUpdateRequest $request, Purchase $purchase)
    {
        $purchase->update($request->all());
        return (new PurchaseResource($purchase));
    }
}
