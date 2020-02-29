<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SalesResource;
use App\Sales;
use Illuminate\Http\Request;

class SalesTogglePaidController extends Controller
{
    public function __invoke(Sales $sale)
    {
        $sale->togglePaid();
        return (new SalesResource($sale));
    }
}
