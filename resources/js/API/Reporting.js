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
        });

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
    },
    productivitySummary: function(type, zone, territory, distributor, sr) {
        const url = "/palmolive/get_productivity_summary";

        return new Promise(function(resolve, reject) {
            axios.post(url, { type, zone, territory, distributor, sr }).then(function(res) {
                resolve(res.data);
            }).catch(function(err) {
                reject(err);
            })
        })
    },
    getPrimaryRawReport: function(startDate, endDate) {
        let url = `/palmolive/get_primary_raw_report/${startDate}/${endDate}`;
        return new Promise(function(resolve, reject) {
            axios.get(url, {responseType: 'arraybuffer'}).then(function(res) {
                resolve(res.data)
            });
        });
    },
    getSecondaryRawReport: function(startDate, endDate) {
        let url = `/palmolive/get_secondary_raw_report/${startDate}/${endDate}`;
        return new Promise(function(resolve, reject) {
            axios.get(url, {responseType: 'arraybuffer'}).then(function(res) {
                resolve(res.data);
            })
        });
    }
}


export default Reporting;
