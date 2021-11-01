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
    getDeeper: function(headId, subHeadId, year, depth, region, zone, territory, distributor, sr) {
        let url = "/palmolive/deep-detail";
        // if(depth === "Region") url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}`;
        // else if(depth === "Zone") url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}/${region}`;
        // else if(depth === 'Territory') url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}/${region}/${zone}`;
        // else if(depth === 'Distributor') url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}/${region}/${zone}/${territory}`;
        // else if(depth === 'SR') url = `/palmolive/deep-detail/${headId}/${subHeadId}/${year}/${depth}/${region}/${zone}/${territory}/${distributor}`;
        return new Promise(function(resolve, reject) {
            axios.post(url, {headId, subHeadId, year, depth, region, zone, territory, distributor}).then(function(res) {
              resolve(res.data);
            }).catch(err => {
                reject();
            })
        });
    }
}


export default Reporting;
