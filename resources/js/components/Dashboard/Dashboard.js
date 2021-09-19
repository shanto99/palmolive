import React from "react";
import ReactTooltip from 'react-tooltip';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Reporting from "../../API/Reporting";
import Utility from "../../utility";

import './dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedYear: new Date(),
            reportingData: [],
            sync: false,
            tooltip: true
        };

        this.generateReportRows = this.generateReportRows.bind(this);
        this.selectYear = this.selectYear.bind(this);
        this.getDashboardReportingData = this.getDashboardReportingData.bind(this);
        this.initiateSync = this.initiateSync.bind(this);
        this.handleExport = this.handleExport.bind(this);
    }
    componentDidMount() {
        this.getDashboardReportingData();
    }

    formatValue(subHead)
    {
        if(subHead !== "Import L/C number") {
            return function(value) {
               if(!value) return "";
               else return Number.parseFloat(value).toFixed(2);
            }
        } else {
            return function(value, isVoid) {
                if(!value || isVoid) return "";
                value = Number.parseFloat(value).toFixed(0);
                if (value < 1) return "";
                else return value;
             }
        }

    }

    getColorStatus(achievement, subHead)
    {
        if(subHead === "Import L/C number") return "";
        else return achievement < 80 ? 'red' : achievement <= 99 ? 'amber' : 'green';
    }

    getDashboardReportingData()
    {
        let selectedYear = this.state.selectedYear.getFullYear();
        Reporting.getDashboardReport(selectedYear, (results => {
            let heads = [];
            results.forEach(result => {
                let formatter = this.formatValue(result.SubHeadName);
                if(!heads[result.HeadName]) {
                    heads[result.HeadName] = [{
                        head: result.HeadName,
                        isHead: true
                    }];
                }

                let achievement = Number.parseFloat(result['% Ach to Goal']).toFixed(2);

                heads[result.HeadName].push({
                    head: result.SubHeadName,
                    goal: formatter(result.YearGoal),
                    jan: formatter(result.January),
                    feb: formatter(result.February),
                    mar: formatter(result.March),
                    apr: formatter(result.April),
                    may: formatter(result.May),
                    jun: formatter(result.June),
                    jul: formatter(result.July),
                    aug: formatter(result.August),
                    sep: formatter(result.September),
                    oct: formatter(result.October),
                    nov: formatter(result.November),
                    dec: formatter(result.December),
                    ytd: formatter(result.YTD, true),
                    achievement: formatter(achievement, true),
                    gr_vs_ytd: formatter(result.YTD_Growth, true),
                    colorStatus: this.getColorStatus(achievement, result.SubHeadName)
                });
            });

            this.setState({
                reportingData: heads
            });

        }));
    }

    generateReportRows()
    {
        let rows = [];
        Object.values(this.state.reportingData).forEach(valueArr => {
            rows = [...rows, ...valueArr]
        });
        let rowElms = [];

        let statusStyles = {
            red: {
                backgroundColor: '#dc3545',
                width: '50px',
                color: 'white'
            },
            amber: {
                backgroundColor: '#FFBF00',
                width: '50px',
                color: 'white'
            },
            green: {
                backgroundColor: 'green',
                width: '50px',
                color: 'white'
            }
        };

        let subheadStyle = {
            backgroundColor: '#dee2e6',
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign:'left'
        };

        let cellStyle = {
            textAlign: 'right'
        };

        let alignLeft = {
            textAlign: 'left'
        }
        function getAchievementColStyle(row, isDistribution) {
            if(isDistribution) return cellStyle;
            return {...cellStyle, ...statusStyles[row.colorStatus]}
        }
        let rowHead = "";
        rowElms = rows.map((row, index) => {
            if(row.isHead) rowHead = row.head;
            rowHead = rowHead.trim();
            let isDistribution = rowHead === "Distribution";
            return (
                <tr key={index}>
                    <td style={row.isHead ? subheadStyle : alignLeft}>
                        {
                            row.head.includes("SRs worked")
                            ? (<div id="tooltip-container">
                                <div
                                    data-for="active-sr"
                                    data-tip="Working definition means each SR be working at least 20 days in a month and min 10 bills / memos generating for the working day"
                                    data-iscapture="true"
                                >
                                    {row.head}
                                    <i className="fas fa-info-circle"/>
                                </div>
                                {/*<span style={{ fontSize: '7px' }}></span>*/}
                                    {this.state.tooltip
                                    ? <ReactTooltip id="active-sr" place="right" type="dark" effect="float"/>
                                    : null}

                            </div>)
                            : row.head
                        }
                    </td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.goal || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.jan || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.feb || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.mar || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.apr || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.may || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.jun || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.jul || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.aug || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.sep || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.oct || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.nov || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>{row.dec || ""}</td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>
                        {!isDistribution ? (row.ytd || "") : ""}
                    </td>
                    <td style={row.isHead ? subheadStyle : getAchievementColStyle(row, isDistribution)}>
                        {!isDistribution ? (row.achievement || "") : ""}
                    </td>
                    <td style={row.isHead ? subheadStyle : cellStyle}>
                        {!isDistribution ? (row.gr_vs_ytd || "") : ""}
                    </td>
                    {/*{!isDistribution*/}
                    {/*? <td style={ row.isHead ? subheadStyle : statusStyles[row.colorStatus]}/>*/}
                    {/*: <td></td>}*/}
                </tr>
            )
        });

        return rowElms;
    }

    selectYear(date)
    {
        this.setState({
            selectedYear: date
        }, this.getDashboardReportingData)
    }

    initiateSync(e)
    {
        e.preventDefault();
        if(this.state.sync) return;
        console.log("here");
        this.setState({
            sync: true
        }, () => {
            Reporting.syncReportData(() => {
                this.setState({
                    sync: false
                });
            })
        });
    }

    handleExport(e)
    {
        e.preventDefault();
        this.setState({
            tooltip: false
        }, () => {
            Utility.exportHtmlTableToExcel('dashboard-report-table', 'palmolive_dashboard_report');
            this.setState({
                tooltip: true
            });
        });
    }

    render() {
        let fullYear = this.state.selectedYear.getFullYear();
        let shortYear = fullYear.toString().substring(2);
        let tableHeadStyle = {
            backgroundColor: '#dee2e6',
            fontSize: '14px',
            fontWeight: 'bold'
        }
        return(
            <React.Fragment>
                <header className="page-header">
                    <h2>Report</h2>
                    <button className="btn btn-success btn-lg" onClick={this.initiateSync}
                            style={{ float: 'right', marginRight: '10px', marginTop: '5px' }}>
                        Sync
                        {
                            this.state.sync
                            ? <div className="spinner-border spinner-border-sm" role="status" style={{ marginLeft: '10px' }}>
                                   <span className="sr-only">Loading...</span>
                               </div>
                             : null
                        }

                    </button>
                </header>
                <div className="dashboard-report-container">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className="form-group">
                            <DatePicker
                                dateFormat="yyyy"
                                className="form-control"
                                selected={this.state.selectedYear}
                                onChange={this.selectYear}
                                showYearPicker={true}
                            />
                        </div>

                        <button className="btn btn-success float-right" onClick={this.handleExport}>Export</button>
                    </div>

                    <br/>

                    <div className="table-responsive table-container">
                        <table className="table table-bordered report-table" id="dashboard-report-table">
                            <thead>
                            <tr>
                                <th scope="col" style={tableHeadStyle}>Head</th>
                                <th scope="col" style={tableHeadStyle}>Yr {fullYear} goal</th>
                                <th scope="col" style={tableHeadStyle}>Jan'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Feb'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Mar'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Apr'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>May'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Jun'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Jul'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Aug'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Sep'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Oct'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Nov'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>Dec'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>YTD'{shortYear}</th>
                                <th scope="col" style={tableHeadStyle}>% Ach to Goal </th>
                                <th scope="col" style={tableHeadStyle}>% Gr vs LY YTD </th>
                                {/*<th scope="col" style={tableHeadStyle}>Green/ Amber /Red</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateReportRows()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default Dashboard;
