<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PrimaryExport implements FromArray, WithHeadings {
    public $records;

    public function __construct($records)
    {
        $this->records = $records;
    }

    public function headings(): array
    {
        return [
            'Region',
            'SM Code',
            'SM Name',
            'ZSM Code',
            'Zone',
            'TTY Code',
            'TTY Name',
            'ASM',
            'Pack Size',
            'Customer Code',
            'Customer Name',
            'Cust Type Name',
            'Depot Code',
            'Depot Name',
            'Brand Name',
            'Variant',
            'Sub Category',
            'Prod Category',
            'SBU',
            'Product Code',
            'Product Name',
            'Period',
            'Bonus Qty',
            'Total Qty',
            'NSI',
            'Broad Category',
            'Category'
        ];
    }

    public function array(): array
    {
        return $this->records;
    }
}
