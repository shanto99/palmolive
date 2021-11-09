<?php
namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SecondaryExport implements FromArray, WithHeadings {
    public $records;
    use Exportable;

    public function __construct($records)
    {
        $this->records = $records;
    }
    public function headings(): array
    {
        return [
            'SMCode',
            'Sales Manager',
            'SM Area',
            'ZSM Code',
            'Zone Name',
            'Territory Code',
            'Territory Name',
            'ASM Designation',
            'Distributor Code',
            'Distributor Name',
            'Distributor Type',
            'SP Code',
            'SR Code',
            'SR Name',
            'SR Staff Id',
            'SR Bank AC No.',
            'Beat Code',
            'Beat Name',
            'Customer Code',
            'Customer Name', 'Customer Address',
            'Mobile',
            'Channel Code',
            'Channel',
            'Invoice No.',
            'Invoice Day',
            'Invoice Month',
            'Invoice Year',
            'Invoice Date',
            'Product Code',
            'Product Name',
            'Category',
            'Brand',
            'Variant',
            'Sub Business',
            'Unit Price',
            'Unit VAT',
            'Invoice Qty',
            'Return Qty',
            'Sold Qty',
            'Bonus Qty',
            'Total Qty',
            'TP',
            'VAT',
            'Discount',
            'Other Discount',
            'NET',
            'NSI'
        ];
    }
    public function array(): array
    {
        return $this->records;
//        $start = $this->start;
//        $end = $this->end;
//        $query = "SELECT * FROM [192.168.100.70].[BOOMMirror].[dbo].viewSalesData
//                    WHERE InvoiceDate BETWEEN '$start' AND '$end'";
//        //return collect(DB::select(DB::raw($query)))->take(500);
//
//        return DB::select(DB::raw($query));


    }
}
