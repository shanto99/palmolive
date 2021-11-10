<?php

namespace App\Http\Controllers;

use App\Exports\PrimaryExport;
use App\Exports\SecondaryExport;
use App\Jobs\ExportSecondary;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Maatwebsite\Excel\Facades\Excel;

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

    public function getPrimaryRawReport(Request $request)
    {
        $start = $request->start_date;
        $end = $request->end_date;
        $query = "exec usp_doLoadPrimarySalesRawData '$start', '$end'";
        $result = DB::select($query);
        $result = json_decode(json_encode($result), true);
        //return Excel::download(new PrimaryExport($result), 'primary.xlsx');
        $this->exportexcel($result, 'primary');
    }

    public function getSecondaryRawReport(Request $request)
    {
        $start = $request->start_date;
        $end = $request->end_date;

        $query = "SELECT * FROM [192.168.100.70].[BOOMMirror].[dbo].viewSalesData
                    WHERE InvoiceDate BETWEEN '$start' AND '$end' AND brand IN ('Colgate','Palmolive')";
        $result = DB::select($query);
        $result = json_decode(json_encode($result), true);
        $this->exportexcel($result, 'secondary');
        //$this->exportexcel($result, 'secondary');
        //return Excel::download(new SecondaryExport($result), 'secondary.xlsx');

        //Excel::store(new SecondaryExport($start, $end),'secondary.xlsx', 'real_public');

        //ExportSecondary::dispatch($start, $end);

    }

    public function exportexcel($result, $filename)
    {
        $arrayheading[0] = !empty($result) ? array_keys($result[0]) : [];
        $result = array_merge($arrayheading, $result);

        header("Content-Disposition: attachment; filename=\"{$filename}.xls\"");
        header("Content-Type: application/vnd.ms-excel;");
        header("Pragma: no-cache");
        header("Expires: 0");
        $out = fopen("php://output", 'w');
        foreach ($result as $data) {
            fputcsv($out, $data, "\t");
        }
        fclose($out);
        exit();
    }

    public function getProductivitySummary(Request $request)
    {
        $type = $request->type;
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $query = "exec sp_ProductivitySummaryReport_N '%','%','%','%','%','Colgate,Palmolive','%','%','$start_date','$end_date','Zone','%'";

        if($type === 'Territory') {
            $query = "sp_ProductivitySummaryReport_N '%','$request->zone','%','%','%','Colgate,Palmolive','%','%','$start_date','$end_date','Territory','%'";
        } else if($type === 'Distributor') {
            $query = "sp_ProductivitySummaryReport_N '%','$request->zone','$request->territory','%','%','Colgate,Palmolive','%','%','$start_date','$end_date','Distributor','%'";
        } else if($type === 'SR') {
            $query = "sp_ProductivitySummaryReport_N '%','$request->zone','$request->territory','$request->distributor','%','Colgate,Palmolive','%','%','$start_date','$end_date','SR','%'";
        }
        $result = DB::connection('sqlsrv_second')->select($query);
        return response()->json([
            'records' => $result,
            'status' => 200
        ], 200);
    }
}
