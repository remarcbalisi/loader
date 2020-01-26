<?php

use Illuminate\Http\Request;

//Request token
Route::post('token', 'Api\TokenController@store')->name('request.token');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
