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
        Route::resource('user-number', 'UserNumberController');
        Route::resource('schedule', 'ScheduleController');
    });
});

// Route::group(['middleware' => 'auth:api'], function() {
    Route::Resource('account', 'AccountController');
// });
