<?php

namespace App\Models;

use App\Models\Menu;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = "UserManager";

    protected $primaryKey = 'UserID';

    protected $guarded = [];

    protected $hidden = [];

    protected $rememberTokenName = false;

    const CREATED_AT = 'EntryDate';

    const UPDATED_AT = 'UpdateDate';

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'UserMenu', 'UserID', 'MenuID');
    }
}
