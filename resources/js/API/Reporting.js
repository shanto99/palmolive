const Reporting = {
    getDashboardReport: function(year, cb)
    {
        axios.get(`/palmolive/get-dashboard-report-data/${year}`).then(res => {
            cb(res.data);
        });
    },
    getDashboardReportWithGroup: function(year)
    {
        return new Promise(function(resolve, reject) {
            axios.get(`/palmolive/get-dashboard-report-data-with-group/${year}`).then(res => {
                resolve(res.data);
            });
        })

    },
    syncReportData: function(cb)
    {
        axios.get(`/palmolive/sync-report-data`).then(res => {
            cb();
        });
    },
    getDeeper: function(headId, subHeadId, year, depth, region) {
        let url = "";
        if(depth === "Region") url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}`;
        else if(depth === "Zone") url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}/${region}`;
        return new Promise(function(resolve, reject) {
           axios.get(url).then(function(res) {
              resolve(res.data);
           });
        });
    }
}


export default Reporting;
