<?php

namespace App\Http\Controllers;

use App\Models\GoalInput;
use App\Models\Input;
use Carbon\Carbon;
use Carbon\Doctrine\CarbonDoctrineType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InputController extends Controller
{
    public function getInputValues($headId, $subHeadId, $start, $end)
    {
        $startingPeriod = Carbon::createFromFormat('Y-m-d', $start)->subDays(1);
        $endingPeriod = Carbon::createFromFormat('Y-m-d', $end)->addDays(1);

        $inputs = Input::where('HeadID', $headId)->where('SubHeadID', $subHeadId)->whereBetween('Period', [$startingPeriod, $endingPeriod])->get();

        return response()->json($inputs, 200);
    }

    public function getGoalInputValues($headId, $subHeadId, $start, $end)
    {
        $startingPeriod = Carbon::createFromFormat('Y-m-d', $start)->subDays(1);
        $endingPeriod = Carbon::createFromFormat('Y-m-d', $end)->addDays(1);

        $inputs = GoalInput::where('HeadID', $headId)->where('SubHeadID', $subHeadId)->whereBetween('Year', [$startingPeriod, $endingPeriod])->get();

        return response()->json($inputs, 200);
    }





    public function insertHeadInputs(Request $request)
    {
        $headId = $request->headId;
        $subHeadId = $request->subHeadId;

        $inputs = $request->inputs;
        $this->saveInputs($headId, $subHeadId, $inputs, false);
    }

    public function insertGoalInputs(Request $request)
    {
        $headId = $request->headId;
        $subHeadId = $request->subHeadId;

        $inputs = $request->inputs;

        $this->saveInputs($headId, $subHeadId, $inputs, true);
    }

    public function saveInputs($headId, $subHeadId, $inputs, $isGoal=false)
    {
        DB::beginTransaction();

        foreach($inputs as $userInput) {
            try {
                if($isGoal) {
                    $this->saveGoalInputs($headId, $subHeadId, $userInput);
                } else {
                    $this->saveInputValues($headId, $subHeadId, $userInput);
                }
            } catch(Exception $e) {
                DB::rollback();
                response()->json('Error', 500);
            }
        }

        DB::commit();

        return response()->json('OK', 200);
    }

    public function saveInputValues($headId, $subHeadId, $input)
    {
        $previousRecordQuery = Input::where('HeadID', $headId)->where('SubHeadID', $subHeadId)->whereDate('Period', $input['date']);
        $previousRecord = $previousRecordQuery->first();

        if($previousRecord) {
            if($headId == "1" && $subHeadId == "1") {
                $previousRecordQuery->update([
                    'Text' => $input['value'],
                    'EditedBy' => Auth::user()->UserID
                ]);
            } else {
                $previousRecordQuery->update([
                    'Value' => $input['value'],
                    'EditedBy' => Auth::user()->UserID
                ]);
            }


        } else {
            if($headId == "1" && $subHeadId == "1") {
                Input::create([
                    'HeadID' => $headId,
                    'SubHeadID' => $subHeadId,
                    'Period' => $input['date'],
                    'Text' => $input['value'],
                    'EntryBy' => Auth::user()->UserID
                ]);
            } else {
                Input::create([
                    'HeadID' => $headId,
                    'SubHeadID' => $subHeadId,
                    'Period' => $input['date'],
                    'Value' => $input['value'],
                    'EntryBy' => Auth::user()->UserID
                ]);
            }
        }
    }

    public function saveGoalInputs($headId, $subHeadId, $input)
    {
        $previousRecordQuery = DB::table('InputGoalValue')->where('HeadID', $headId)->where('SubHeadID', $subHeadId)->whereDate('Year', $input['date']);
        $previousRecord = $previousRecordQuery->first();

        if($previousRecord) {
            $previousRecordQuery->update([
                'Value' => $input['value'],
                'EditedBy' => Auth::user()->UserID
            ]);
        } else {
            GoalInput::create([
                'HeadID' => $headId,
                'SubHeadID' => $subHeadId,
                'Year' => $input['date'],
                'Value' => $input['value'],
                'EntryBy' => Auth::user()->UserID
            ]);
        }
    }

}
