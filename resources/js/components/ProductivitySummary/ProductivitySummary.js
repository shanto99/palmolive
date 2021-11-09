import React from "react";
import {
    withStyles,
} from "@material-ui/core";

import Reporting from "../../API/Reporting";

import SummaryTable from "./SummaryTable/SummaryTable";

import styles from "./styles";

class ProductivitySummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
        }
    }

    componentDidMount() {
        this.getRecords('Zone');
    }

    getRecords = (type, zone, territory, distributor, sr) => {
        Reporting.productivitySummary(type, zone).then(res => {
            this.setState(preState => {
                const newState = {...preState};
                if(type === 'Zone') {
                    newState.records = res.records || [];
                    return newState;
                } else {
                    let records = newState.records;
                    let targetZone, targetTerritory;
                    targetZone = records.find(record => record.AMCode === zone);
                    targetZone.details = res.records;
                    return newState;
                }

            });
        }).catch(err => {
            console.log("Productivity summary report error: ", err);
        });
    }

    goDeeper = (id, level, zone, territory, distributor, sr) => {
        if(level === 'Territory') zone = id;
        else if(level === 'Distributor') territory = id;
        else if(level === 'sr') distributor = id;
        this.getRecords(level, zone, territory, distributor, sr);
    }

    render()
    {
        const records = this.state.records || [];
        return (
            <SummaryTable level='Zone' rows={records} expandCb={this.goDeeper}/>
        )
    }

}

export default withStyles(styles)(ProductivitySummary);
