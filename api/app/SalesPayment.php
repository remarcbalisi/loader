<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalesPayment extends Model
{
    protected $guarded = [];

    public function sale() {
        return $this->belongsTo(Sales::class);
    }

    public function payment() {
        return $this->belongsTo(Payment::class);
    }
}
