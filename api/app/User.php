<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username', 'commission', 'address'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function numbers()
    {
        // return $this->hasMany(UserNumber::class, 'user_id', 'id');
        return $this->hasMany(UserNumber::class);
    }

    public static function getBalance($user_id)
    {
        $numbers = UserNumber::where('user_id', $user_id)
                    ->get()
                    ->toArray();
        $num_arr = [];
        foreach ($numbers as $k => $v) {
            array_push($num_arr, $v['id']);
        }
        $balance = Sales::with('number')
                    ->whereIn('user_number_id', $num_arr)
                    ->where('balance', '>', 0)
                    ->get()
                    ->toArray();
        return $balance;
    }
}
