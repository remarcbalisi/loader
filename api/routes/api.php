<?php

use Illuminate\Http\Request;

//Request token
Route::post('token', 'Api\TokenController@store')->name('request.token');

//ADMIN ROUTES
Route::name('admin.')->group(function() {

    Route::group([
        'prefix' => 'v1/admin',
        'namespace' => 'Api\Admin',
        'middleware' => [
            //'auth:api', //uncomment this to restrict to authenticated users only
//            'role:admin'
        ]
    ], function () {
        Route::resource('user', 'UserController');
        Route::get('user-balance/{user_id}', 'UserController@getBalance');
        Route::resource('user-number', 'UserNumberController');
        Route::resource('schedule', 'ScheduleController');
        Route::resource('purchase', 'PurchaseController');
        Route::resource('sales', 'SalesController');
        Route::resource('payment', 'PaymentController');
        Route::get('sales-payment/{sale}', 'PaymentController@viewSalesPaymentBySale')->name('sales.payment.bysale');
        Route::patch('sales-toggle-paid/{sale}', 'SalesTogglePaidController')->name('sales.toggle.paid');
    });
});

// Route::group(['middleware' => 'auth:api'], function() {
    Route::Resource('account', 'AccountController');
// });
