<?php

namespace Tests\Feature;

use App\Schedule;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ScheduleTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $customer;

    protected function setUp(): void
    {
        parent::setUp();
        $agent_role = Role::create(['name' => 'agent', 'guard_name' => 'api']);
        $this->customer = create(User::class);
        $this->customer->assignRole($agent_role);
    }

    public function test_can_view_all_schedule()
    {
        $this->withoutExceptionHandling();

        $schedules_monthly = create(Schedule::class, [
            'mode' => 'monthly',
            'value' => '7',
            'user_id' => $this->customer->id,
        ], 10);

        $this->getJson(route('admin.schedule.index'))
            ->assertJsonFragment([
                'id' => $schedules_monthly->first()->id,
            ]);
    }

    public function test_can_view_schedule()
    {
        $this->withoutExceptionHandling();

        $schedules_monthly = create(Schedule::class, [
            'mode' => 'monthly',
            'value' => '7',
            'user_id' => $this->customer->id,
        ], 10);

        $this->getJson(route('admin.schedule.show', ['schedule'=>$schedules_monthly->first()->id]))
            ->assertJsonFragment([
                'id' => $schedules_monthly->first()->id,
            ]);
    }

    public function test_can_add_schedule()
    {
        $this->withoutExceptionHandling();
        $data = [
            'mode' => 'monthly',
            'value' => '7',
            'user_id' => $this->customer->id,
        ];

        $this->postJson(route('admin.schedule.store'), $data)
            ->assertJsonFragment([
                'mode' => $data['mode'],
                'user_id' => $data['user_id']
            ]);
    }

    public function test_can_update_schedule()
    {
        $this->withoutExceptionHandling();
        $schedules_monthly = create(Schedule::class, [
            'mode' => 'monthly',
            'value' => '7',
            'user_id' => $this->customer->id,
        ]);

        $data = [
            'mode' => 'weekly',
            'value' => 'monday',
            'user_id' => $this->customer->id,
        ];

        $this->patchJson(route('admin.schedule.update', ['schedule'=>$schedules_monthly->id]), $data)
            ->assertJsonFragment([
                'mode' => $data['mode'],
                'user_id' => $data['user_id']
            ]);
    }
}
