<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    public static function updateBalance($account_id, $amount)
    {
        $account = parent::find($account_id);
        $account->balance = $account->balance + $amount;
        $account->save();
    }



}
