import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Reporting from "../../API/Reporting";
import {Button, Grid} from "@material-ui/core";

import DateHelpers from "../../Helpers/DateHelpers";

class RawReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            primaryStartDate: new Date(),
            primaryEndDate: new Date(),
            secondaryStartDate: new Date(),
            secondaryEndDate: new Date()
        }
    }
    selectPrimaryStartDate = (date) => {
        this.setState((preState) => {
           const newState = {...preState};
           newState.primaryStartDate = date;
           return newState;
        });
    }
    selectPrimaryEndDate = (date) => {
        console.log(date);
        this.setState((preState) => {
            const newState = {...preState};
            newState.primaryEndDate = date;
            return newState;
        });
    }
    selectSecondaryStartDate = (date) => {
        this.setState((preState) => {
            const newState = {...preState};
            newState.secondaryStartDate = date;
            return newState;
        });
    }
    selectSecondaryEndDate = (date) => {
        this.setState((preState) => {
            const newState = {...preState};
            newState.secondaryEndDate = date;
            return newState;
        });
    }
    downloadPrimaryRawReport = () => {
        const {primaryStartDate, primaryEndDate} = this.state;
        const startDate = DateHelpers.humanizedDateFormat(primaryStartDate);
        const endDate = DateHelpers.humanizedDateFormat(primaryEndDate);

        Reporting.getPrimaryRawReport(startDate, endDate).then(res => {
            var blob = new Blob([res], {
                type: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'primary.xls';
            link.click();
            link.remove();
        });
    }
    downloadSecondaryRawReport = () => {
        const {secondaryStartDate, secondaryEndDate} = this.state;
        const startDate = DateHelpers.humanizedDateFormat(secondaryStartDate);
        const endDate = DateHelpers.humanizedDateFormat(secondaryEndDate);

        Reporting.getSecondaryRawReport(startDate, endDate).then(res => {
            var blob = new Blob([res], {
                type: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'secondary.xls';
            link.click();
            link.remove();
        });
    }
    render() {
        const {primaryStartDate, primaryEndDate, secondaryStartDate, secondaryEndDate} = this.state;
        const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return (
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <form method="POST" action="https://app.acibd.com/palmolive/get_primary_raw_report">
                        <h4>Download primary raw data</h4>
                        <input type="hidden" name="_token" value={csrf}/>
                        <div>
                            <h5>Select start date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="start_date"
                                className="form-control"
                                selected={primaryStartDate}
                                onChange={this.selectPrimaryStartDate}
                            />
                        </div>

                        <div>
                            <h5>Select end date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="end_date"
                                className="form-control"
                                selected={primaryEndDate}
                                onChange={this.selectPrimaryEndDate}
                            />
                        </div>
                        <br/>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary">
                            Download
                        </Button>
                    </form>
                </Grid>
                <Grid item lg={6}>
                    <form method="POST" action="https://app.acibd.com/palmolive/get_secondary_raw_report">
                        <h4>Download secondary raw data</h4>
                        <input type="hidden" name="_token" value={csrf}/>
                        <div>
                            <h5>Select start date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="start_date"
                                className="form-control"
                                selected={secondaryStartDate}
                                onChange={this.selectSecondaryStartDate}
                            />
                        </div>

                        <div>
                            <h5>Select end date</h5>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                name="end_date"
                                className="form-control"
                                selected={secondaryEndDate}
                                onChange={this.selectSecondaryEndDate}
                            />
                        </div>
                        <br/>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary">
                            Download
                        </Button>
                    </form>
                </Grid>
            </Grid>
        )
    }

}

export default RawReport;
