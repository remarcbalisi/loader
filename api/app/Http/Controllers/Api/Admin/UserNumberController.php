<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserNumberStoreRequest;
use App\Http\Requests\UserNumberUpdateRequest;
use App\Http\Resources\UserNumberCollection;
use App\Http\Resources\UserNumberResource;
use App\UserNumber;
use Illuminate\Http\Request;

class UserNumberController extends Controller
{
    public function index()
    {
        return (new UserNumberCollection(UserNumber::paginate()));
    }

    public function show(UserNumber $userNumber)
    {
        return (new UserNumberResource($userNumber));
    }

    public function store(UserNumberStoreRequest $request)
    {
        $newUserNumber = UserNumber::create($request->all());
        return (new UserNumberResource($newUserNumber));
    }

    public function update(UserNumberUpdateRequest $request, UserNumber $userNumber)
    {
        $userNumber->update($request->all());
        return (new UserNumberResource($userNumber));
    }
}
