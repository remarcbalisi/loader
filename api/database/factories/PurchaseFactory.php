<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Purchase;
use Faker\Generator as Faker;

$factory->define(Purchase::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 10)
    ];
});
