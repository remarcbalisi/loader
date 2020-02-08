<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return (new UserCollection(User::get()));
    }

    public function store(UserStoreRequest $request)
    {
        $new_user = User::create($request->all());
        return (new UserResource($new_user));
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->all());
        return (new UserResource($user));
    }
}
