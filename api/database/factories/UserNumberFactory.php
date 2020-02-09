<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\UserNumber;
use App\User;
use Faker\Generator as Faker;

$factory->define(UserNumber::class, function (Faker $faker) {
    return [
        'number' => $faker->phoneNumber,
        'user_id' => factory(User::class)
    ];
});
