<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    protected $guarded = [];

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'id');
    }

    public function number()
    {
        return $this->belongsTo(UserNumber::class, 'user_number_id', 'id');
    }
}
