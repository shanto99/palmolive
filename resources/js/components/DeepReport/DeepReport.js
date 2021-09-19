import React from "react";
import Reporting from "../../API/Reporting";
import {Accordion, AccordionDetails, AccordionSummary, Box} from "@material-ui/core";

const reportRowStyle = {
    width: '100%',
    display: 'flex'
};

const reportCellStyle = {
    flex: 1,
    flexBasis: '100px',
    padding: '5px 10px',
    color: 'black'
};

const reportTitleCell = {
    flexBasis: '300px'
}

class DeepReport extends React.Component {
    constructor(props) {
        super(props);
        let shortYear = this.props.year.substring(2);
        this.state = {
            depthTrack: [],
            reportData: [],
            months: [`Jan ${shortYear}`, `Feb ${shortYear}`, `Mar ${shortYear}`, `Apr ${shortYear}`, `May ${shortYear}`, `Jun ${shortYear}`, `Jul ${shortYear}`,
                `Aug ${shortYear}`,`Sep ${shortYear}`,`Oct ${shortYear}`,`Nov ${shortYear}`,`Dec ${shortYear}`]
        }

        this.goDeeper = this.goDeeper.bind(this);
    }

    componentDidMount() {
        let {headId, subHeadId, year, depth, region} = this.props;
        Reporting.getDeeper(headId, subHeadId, year, depth, region).then(res => {
            this.setState({
                reportData: res.details
            })
        })
    }

    goDeeper(trackId)
    {
        if(this.state.depthTrack.includes(trackId))  return;
        else {
            let depthTrack = [...this.state.depthTrack, trackId];
            this.setState({
               depthTrack: depthTrack
            });
        }
    }

    render() {
        const classes = this.props.classes;
        if(this.state.reportData.length < 1) return (
            <div>No records found</div>
        )

        return (
            <Box style={{width: '100%'}}>
                {this.state.reportData.map((record, index) => (
                    <Accordion key={index} onChange={() => this.goDeeper(record.Category)}>
                        <AccordionSummary>
                            <div style={reportRowStyle} key={record.Category}>
                                <div style={{...reportTitleCell, ...reportCellStyle}}>
                                    {record.Category}
                                </div>
                                {this.state.months.map((month, index) => (
                                    <div key={month} style={reportCellStyle}>
                                        {record[month]}
                                    </div>
                                ))}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {this.props.depth === "Region" && this.state.depthTrack.includes(record.Category)
                            ? <DeepReport year={this.props.year} depth = 'Zone'
                                          region={record.Category}
                                          headId={this.props.headId} subHeadId={this.props.subHeadId}/>
                            : "No details found"}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        )
    }
}

export default DeepReport;
