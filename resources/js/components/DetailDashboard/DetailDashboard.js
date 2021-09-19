import React from "react";
import {Grid, withStyles, Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";

import DeepReport from "../DeepReport/DeepReport";

import Reporting from "../../API/Reporting";

import styles from "./styles";


class DetailDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            months: ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
            selectedYear: '2021',
            reportData: null,
            depthTrack: []
        }


        this.generateReportData = this.generateReportData.bind(this);
    }

    componentDidMount() {
        Reporting.getDashboardReportWithGroup(this.state.selectedYear).then(res => {
            this.setState({
                reportData: res
            });
        })
    }

    goDeeper(subHeadId)
    {
        if(this.state.depthTrack.includes(subHeadId)) return;
        let depthTrack = [...this.state.depthTrack, subHeadId];

        this.setState({
            depthTrack: depthTrack
        });
    }

    generateReportData(head) {
        if(!this.state.reportData) return null;

        const classes = this.props.classes;
        return this.state.reportData[head].map(subHead => (
            <Accordion onChange={() => this.goDeeper(subHead.SubHeadID)}>
                <AccordionSummary>
                    <div className={classes.reportRow} key={subHead.SubHeadName}>
                        <div className={`${classes.reportCell} ${classes.reportHeadTitleCell}`}>
                            {subHead.SubHeadName}
                        </div>
                        {this.state.months.map((month, index) => (
                            <div key={month+index+index} className={`${classes.reportCell}`}>
                                {subHead[month]}
                            </div>
                        ))}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {this.state.depthTrack.includes(subHead.SubHeadID)
                    ? <DeepReport headId={subHead.HeadID} depth="Region" subHeadId={subHead.SubHeadID} year={this.state.selectedYear} />
                    : null}
                </AccordionDetails>
            </Accordion>
            ))
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.rootContainer}>
                <div className={classes.reportContainer}>
                    <Grid container>
                        <Grid item lg={12} sm={12}>
                            <div className={classes.reportRow}>
                                <div className={`${classes.reportCell} ${classes.reportHead} ${classes.reportHeadTitleCell}`}>
                                    Head
                                </div>
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                                    <div key={month} className={`${classes.reportCell} ${classes.reportHead}`}>
                                        {`${month}'${this.state.selectedYear.substring(2)}`}
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        {this.state.reportData
                            ? <Grid item lg={12} sm={12}>
                                {Object.keys(this.state.reportData).map(head => (
                                    <section key={head}>
                                        <div className={classes.reportRow}>
                                            <div className={`${classes.reportCell} ${classes.reportHead} ${classes.reportHeadTitleCell}`}>
                                                {head}
                                            </div>
                                            {this.state.months.map((month, index) => (
                                                <div key={month+index} className={`${classes.reportCell} ${classes.reportHead}`}>

                                                </div>
                                            ))}
                                        </div>
                                        {this.generateReportData(head)}
                                    </section>
                                ))}
                            </Grid>
                            : null
                        }
                    </Grid>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(DetailDashboard);
