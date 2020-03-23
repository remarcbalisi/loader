<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Payment;
use App\Sales;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index() {
        $payments = Payment::paginate(15);
        return response()->json($payments, 200);
    }

    public function viewSalesPaymentBySale($sale_id) {
        $sale = Sales::find($sale_id);
        $salesPayments = $sale->salesPayments()->get();
        return response()->json($salesPayments, 200);
    }
}
