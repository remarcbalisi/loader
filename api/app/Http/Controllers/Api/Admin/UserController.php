<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return (new UserCollection(User::paginate()));
    }

    public function store(UserStoreRequest $request)
    {
        $new_user = User::create($request->except(['role']));
        $role = Role::findByName($request->role, 'api');
        $new_user->assignRole($role);
        return (new UserResource($new_user));
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->except(['role']));
        $role = Role::findByName($request->role, 'api');
        $user->syncRoles($role);
        return (new UserResource($user));
    }
}
