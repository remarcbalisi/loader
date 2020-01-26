<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TokenRequest;
use App\Http\Resources\TokenResource;
use App\User;
use Illuminate\Support\Facades\Auth;

class TokenController extends Controller
{
    public function store(TokenRequest $request)
    {
        $fieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        if(Auth::attempt(array($fieldType => $request->username, 'password' => $request->password)))
        {
            $token = auth()->user()->createToken('Access Token')->accessToken;
            return new TokenResource(['token'=>$token]);
        }else{
            return response()->json(['message' => 'Sorry, wrong credentials'], 400);
        }
    }
}
