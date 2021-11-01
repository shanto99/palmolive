<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function getDashboardReport($year)
    {
        $query = "exec usp_doLoadDashboard '".$year."'";

        $result = DB::select(DB::raw($query));
        return response()->json($result, 200);
    }

    public function getDashboardReportWithGrouping($year) {
        $query = "exec usp_doLoadDashboard '".$year."'";

        $result = DB::select(DB::raw($query));
        $resultCollection = collect($result);
        $groupedResult = $resultCollection->groupBy('HeadName');
        return response()->json($groupedResult, 200);
    }

    public function syncReport()
    {
//        exec SP_SyncColgatePrimarySales '2021-07-01 00:00:00.000', '2021-08-24 00:00:00.000'
//        exec usp_SyncBoomColgateData
        $query1 = "exec SP_SyncColgatePrimarySales '". Carbon::now()->format('Y-m-d') ."', '". Carbon::now()->subMonths(1)->firstOfMonth()->format('Y-m-d')."'";
        $query2 = "exec usp_SyncBoomColgateData";

        DB::statement(DB::raw($query1));
        DB::statement(DB::raw($query2));

        return response()->json("Synced");
    }

    public function get_deeper(Request $request)
    {
        $headId = $request->headId;
        $subHeadId = $request->subHeadId;
        $year = $request->year;
        $depth = $request->depth;
        $region = $request->region ?: '';
        $zone = $request->zone ?: '';
        $territory = $request->territory ?: '';
        $distributor = $request->distributor ?: '';
        $sr = $request->sr?: '';

        if($headId == 3) {
            $query = "exec usp_doLoadDashbordProduct '$subHeadId', '$headId', '$year'";
        } else {
            $query = "exec usp_doLoadDashbordDetails '$subHeadId', '$headId', '$year','$depth','$region','$zone', '$territory','$distributor',''";
        }
        $result = DB::select(DB::raw($query));

        return response()->json([
           'details' => $result,
            'status' => 200
        ], 200);
    }
}
