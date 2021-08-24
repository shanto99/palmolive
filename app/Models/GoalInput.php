<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoalInput extends Model
{
    use HasFactory;

    protected $table = "InputGoalValue";

    protected $primaryKey = ['SubHeadID', 'HeadID', 'Year'];

    public $incrementing = false;

    protected $hidden = [];

    protected $guarded = [];

    const CREATED_AT = 'EntryDate';

    const UPDATED_AT = 'EditedDate';
}
