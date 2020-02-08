<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Account;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::get();
        return response()->json($accounts , 200);
    }

    public function show(Account $account)
    {
        return response($account, 200);
    }

    public function store(Request $request)
    {
        $account = Account::create($request->all());
        return response()->json($account , 200);
    }

    public function update(Account $account)
    {
        $account = tap($account)->update(request()->all());
        return response()->json($account , 200);
    }

    public function destroy(Account $account)
    {
        $account->delete();
        return $this->index();
    }
}
