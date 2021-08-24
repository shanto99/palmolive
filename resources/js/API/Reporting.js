const Reporting = {
    getDashboardReport: function(year, cb)
    {
        axios.get(`/palmolive/get-dashboard-report-data/${year}`).then(res => {
            cb(res.data);
        });
    },
    syncReportData: function(cb)
    {
        axios.get(`/palmolive/sync-report-data`).then(res => {
            cb();
        });
    }
}


export default Reporting;
