<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchedulePostRequest;
use App\Http\Requests\ScheduleUpdateRequest;
use App\Http\Resources\ScheduleCollection;
use App\Http\Resources\ScheduleResource;
use App\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return (new ScheduleCollection(Schedule::paginate()));
    }

    public function show(Schedule $schedule)
    {
        return (new ScheduleResource($schedule));
    }

    public function store(SchedulePostRequest $request)
    {
        $new_schedule = Schedule::create($request->all());
        return (new ScheduleResource($new_schedule));
    }

    public function update(ScheduleUpdateRequest $request, Schedule $schedule)
    {
        $schedule->update($request->all());
        return (new ScheduleResource($schedule));
    }
}
