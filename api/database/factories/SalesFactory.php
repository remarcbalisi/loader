<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Sales;
use Faker\Generator as Faker;

$factory->define(Sales::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 10),
    ];
});
