<?php

use Illuminate\Http\Request;

//Request token
Route::post('token', 'Api\TokenController@store')->name('request.token');

//ADMIN ROUTES
Route::group([
    'prefix' => 'v1/admin',
    'namespace' => 'Api\Admin'
], function() {

    Route::group([
        'middleware' => [
            'auth:api'
        ]
    ], function () {

    });
});
