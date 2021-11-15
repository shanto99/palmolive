import React from "react";
import {Button, withStyles,} from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Reporting from "../../API/Reporting";

import SummaryTable from "./SummaryTable/SummaryTable";

import PalmoliveLoader from "../PalmoliveLoader/PalmoliveLoader";
import DateHelpers from "../../Helpers/DateHelpers";

import styles from "./styles";

class ProductivitySummary extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.scrollRef = React.createRef();
        this.scrollRef.current = 0;
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            isLoading: true,
            records: [],
        }
    }

    onScroll = () => {
        if(this.state.isLoading) return;
        this.scrollRef.current = this.containerRef.current.scrollTop;
        //this.props.setScroll(scrollValue);
    }

    componentDidMount() {
        this.getRecords('Zone');
    }

    getRecords = (type, zone, territory, distributor, sr) => {
        let startDate = DateHelpers.humanizedDateFormat(this.state.startDate);
        let endDate = DateHelpers.humanizedDateFormat(this.state.endDate);

        Reporting.productivitySummary(type, zone, territory, distributor, startDate, endDate).then(res => {
            this.setState(preState => {
                const newState = {...preState};
                if(type === 'Zone') {
                    newState.isLoading = false;
                    newState.records = res.records || [];
                    return newState;
                } else {
                    newState.isLoading = false;
                    let records = newState.records;
                    let targetZone, targetTerritory;
                    targetZone = records.find(record => record.AMCode === zone);
                    if(type === 'Territory') {
                        targetZone.details = res.records;
                        return newState;
                    } else if(type === 'Distributor' || type === 'SR') {
                        let territories = targetZone.details;
                        targetTerritory = territories.find(ter => ter.TerritoryCode === territory);
                        if(type === 'Distributor') {
                            targetTerritory.details = res.records;
                            return newState;
                        } else {
                            let distributors = targetTerritory.details;
                            let targetDistributor = distributors.find(dis => dis.DistributorCode === distributor);
                            targetDistributor.details = res.records;
                            return newState;
                        }
                    }
                }

            });
        }).catch(err => {
            console.log("Productivity summary report error: ", err);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.state.isLoading) {
             this.containerRef.current.scrollTop = this.scrollRef.current;
        }

    }

    goDeeper = (id, level, zone, territory, distributor, sr) => {
        if(!level) return;
        if(level === 'Territory') zone = id;
        else if(level === 'Distributor') territory = id;
        else if(level === 'sr') distributor = id;
        this.setState({
            isLoading: true
        }, () => this.getRecords(level, zone, territory, distributor, sr));
    }

    setStartDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    setEndDate = (date) => {
        this.setState({
            endDate: date
        });
    }

    getDateForDateRange = () => {
        this.setState({
            isLoading: true
        }, () => this.getRecords('Zone'));
    }

    render()
    {
        const records = this.state.records || [];
        const {startDate, endDate} = this.state;
        const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return (
            <div
                ref={this.containerRef}
                onScroll={this.onScroll}
                style={{ width: '100%', height: '85vh', overflowX: 'auto', overflowY:'auto' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <h5>Select start date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="start_date"
                                className="form-control"
                                selected={startDate}
                                onChange={this.setStartDate}
                            />
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <h5>Select start date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="start_date"
                                className="form-control"
                                selected={endDate}
                                onChange={this.setEndDate}
                            />
                        </div>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.getDateForDateRange}
                            style={{ height: '30px', alignSelf: 'end' }}
                        >
                            Submit
                        </Button>
                    </div>
                    <form method="post" action="/palmolive/export_productivity_summary" style={{ alignSelf: 'center' }}>
                        <input type="hidden" name="_token" value={csrf}/>
                        <input type="hidden" name="start_date"
                               value={DateHelpers.humanizedDateFormat(this.state.startDate)}/>
                        <input type="hidden" name="end_date"
                               value={DateHelpers.humanizedDateFormat(this.state.endDate)}/>
                        <input type="submit" name="export" value="Export"/>
                    </form>
                </div>
                {this.state.isLoading
                ? <PalmoliveLoader/>
                : <SummaryTable
                    size="small" aria-label="a dense table"
                    level='Zone' rows={records} expandCb={this.goDeeper}/>}
            </div>
        )
    }

}

export default withStyles(styles)(ProductivitySummary);
