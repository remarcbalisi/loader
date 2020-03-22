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

    public function togglePaid()
    {
        $this->is_paid = !$this->is_paid;
        $this->save();
        return $this;
    }
}
