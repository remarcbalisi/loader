<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $guarded = [];

    public function salesPayment() {
        return $this->hasMany(SalesPayment::class, 'payment_id', 'id');
    }
}
