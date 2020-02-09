<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    $typeArray = array("agent", "direct");
    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'commission' => rand(0, 1000),
        'type' => $typeArray[array_rand($typeArray)],
    ];
});
