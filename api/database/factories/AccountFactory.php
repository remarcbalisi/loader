<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Account;
use Faker\Generator as Faker;

$factory->define(Account::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'number' => $faker->phoneNumber,
        'network' => $faker->name,
        'description' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true)
    ];
});
