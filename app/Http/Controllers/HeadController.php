<?php

namespace App\Http\Controllers;

use App\Models\Head;
use Illuminate\Http\Request;

class HeadController extends Controller
{
    public function getCostHeads()
    {
        $heads = Head::all();
        return response()->json($heads, 200);
    }


    public function getCostSubHeads($headId, $isGoal=false)
    {
        $head = Head::find($headId);
        if($isGoal) {
            $subHeads = $head->subHeads;
        } else {
            $subHeads = $head->manualSubHeads;
        }
        return response()->json($subHeads, 200);
    }

}
