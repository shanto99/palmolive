<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Input extends Model
{
    use HasFactory;

    protected $table = "InputValue";

    protected $primaryKey = ['SubHeadID', 'HeadID', 'Period'];

    public $incrementing = false;

    protected $hidden = [];

    protected $guarded = [];

    const CREATED_AT = 'EntryDate';

    const UPDATED_AT = 'EditedDate';
}
