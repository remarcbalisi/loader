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
            'auth:api',
            'role:admin'
        ]
    ], function () {
        Route::resource('user', 'UserController');
    });
});
