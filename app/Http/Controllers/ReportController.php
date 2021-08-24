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
}
