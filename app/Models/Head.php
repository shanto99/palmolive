<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\SubHead;

class Head extends Model
{
    use HasFactory;

    protected $table = "Head";

    protected $primaryKey = "HeadID";

    public function subHeads()
    {
        return $this->hasMany(SubHead::class, 'HeadID', 'HeadID');
    }
    public function manualSubHeads()
    {
        return $this->hasMany(SubHead::class, 'HeadID', 'HeadID')->where('InputType', 'manual');
    }
}
