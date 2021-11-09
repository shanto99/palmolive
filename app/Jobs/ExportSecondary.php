<?php

namespace App\Jobs;

use Illuminate\Bus\Batchable;
use App\Exports\SecondaryExport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportSecondary implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $start;
    public $end;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($start, $end)
    {
        $this->start = $start;
        $this->end = $end;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        (new SecondaryExport($this->start, $this->end))->store('public/secondary.xlsx');
    }
}
