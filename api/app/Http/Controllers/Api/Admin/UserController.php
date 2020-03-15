<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\User;
use App\UserNumber;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        if(request()->role) {
            $users = User::with('roles', 'numbers')
                        ->whereHas("roles", function($q) {
                            $q->whereIn('name', request()->role);
                        })
                        ->get()
                        ->toArray();
        }
        else {
            $users = User::with('roles', 'numbers')->get()->toArray();
        }

        foreach($users as $i => $user)
        {
            $user['role'] = $user['roles'][0]['name'];
            unset($user['roles']);
            $users[$i] = $user;
        }
        return response($users, 200);
    }

    public function show(User $user)
    {
        $user->numbers = UserNumber::where('user_id', $user->id)
                            ->where('status', 1)
                            ->get();
        $user->role = $user->getRoleNames()->toArray()[0];
        return response($user, 200);
    }

    public function store(UserStoreRequest $request)
    {
        $request->password = 'secret';
        $new_user = User::create($request->except(['role']));
        $role = Role::findByName($request->role, 'api');
        $new_user->assignRole($role);

        $number = [
            'user_id' => $new_user->id,
            'number' => $request->number,
            'network' => $request->network,
        ];
        UserNumber::create($number);

        return (new UserResource($new_user));
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->except(['role']));
        $role = Role::findByName($request->role, 'api');
        $user->syncRoles($role);
        return (new UserResource($user));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response([], 200);;
    }
}
