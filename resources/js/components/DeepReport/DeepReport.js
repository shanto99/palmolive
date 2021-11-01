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
    flexBasis: '150px'
}

const categoryCell = {
    flex: 1,
    flexBasis: '150px',
    padding: '5px 10px'
};

const valueCell = {
    textAlign: 'right'
}

const titleCell = {
    backgroundColor: "#ccc"
}

class DeepReport extends React.Component {
    constructor(props) {
        super(props);
        let shortYear = this.props.year.substring(2);
        this.state = {
            selectedYear: this.props.year,
            depthTrack: [],
            reportData: [],
            months: [`Jan ${shortYear}`, `Feb ${shortYear}`, `Mar ${shortYear}`, `Apr ${shortYear}`, `May ${shortYear}`, `Jun ${shortYear}`, `Jul ${shortYear}`,
                `Aug ${shortYear}`,`Sep ${shortYear}`,`Oct ${shortYear}`,`Nov ${shortYear}`,`Dec ${shortYear}`]
        }

        this.goDeeper = this.goDeeper.bind(this);
        this.getReportData = this.getReportData.bind(this);
    }

    componentDidMount() {
        this.getReportData();
    }

    getReportData()
    {
        let {headId, subHeadId, year, depth, zone, region, territory, distributor} = this.props;
        Reporting.getDeeper(headId, subHeadId, year, depth, region, zone, territory, distributor).then(res => {
            this.setState({
                reportData: res.details
            })
        }).catch(() => {
            this.setState({
                reportData: []
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

    getDeepTitle(depth)
    {
        if(this.props.headId === "3") return "Product name";
        if(depth === "Region") return "Region name";
        else if(depth === "Zone") return "Zone name";
        else if(depth === "Territory") return "Territory name";
        else if(depth === "Distributor") return "Distributor name";
        else return "SR name";
    }

   componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            selectedYear: nextProps.year
        }, this.getReportData)
   }

    render() {
        let shortYear = this.state.selectedYear.substring(2);
        let months = [`Jan ${shortYear}`, `Feb ${shortYear}`, `Mar ${shortYear}`, `Apr ${shortYear}`, `May ${shortYear}`, `Jun ${shortYear}`, `Jul ${shortYear}`,
            `Aug ${shortYear}`,`Sep ${shortYear}`,`Oct ${shortYear}`,`Nov ${shortYear}`,`Dec ${shortYear}`]
        if(this.state.reportData.length < 1) return (
            <div>No records found</div>
        )

        return (
            <Box style={{width: '100%'}}>
                <div style={{ padding: '0 18px', width: '100%', display: 'flex' }}>
                    <div style={{...categoryCell, ...titleCell}}>
                        {this.getDeepTitle(this.props.depth)}
                    </div>
                    {months.map((month, index) => (
                        <div key={month} style={{...reportCellStyle, ...titleCell, ...valueCell}}>
                            {month}
                        </div>
                    ))}
                </div>
                {this.state.reportData.map((record, index) => (
                    <Accordion key={index} onChange={() => this.goDeeper(record.Category)}>
                        <AccordionSummary>
                            <div style={reportRowStyle} key={record.Category}>
                                <div style={{...reportCellStyle, ...reportTitleCell}}>
                                    { this.props.headId === "3" ? record.ProductName : record.Category}
                                </div>
                                {months.map((month, index) => (
                                    <div key={month} style={{...reportCellStyle, ...valueCell}}>
                                        {record[month]}
                                    </div>
                                ))}
                            </div>
                        </AccordionSummary>
                        {this.props.headId === "3"
                        ? <AccordionDetails>
                                No details found
                          </AccordionDetails>
                        : <AccordionDetails>
                            {this.props.depth === "Region" && this.state.depthTrack.includes(record.Category)
                            ? <DeepReport year={this.props.year} depth = 'Zone'
                                          region={record.Category}
                                          headId={this.props.headId} subHeadId={this.props.subHeadId}/>
                            : this.props.depth === "Zone" && this.state.depthTrack.includes(record.Category)
                            ? <DeepReport year={this.props.year} depth = 'Territory'
                                          region={this.props.region} zone = {record.Category}
                                          headId={this.props.headId} subHeadId={this.props.subHeadId}/>
                            : this.props.depth === "Territory" && this.state.depthTrack.includes(record.Category)
                            ? <DeepReport year={this.props.year} depth = 'Distributor'
                                          region={this.props.region} zone={this.props.zone} territory = {record.Category}
                                          headId={this.props.headId} subHeadId={this.props.subHeadId}/>
                            : this.props.depth === "Distributor" && this.state.depthTrack.includes(record.Category)
                            ? <DeepReport year={this.props.year} depth = 'SR'
                                          region={this.props.region} zone={this.props.zone} territory = {this.props.territory} distributor = {record.Category}
                                          headId={this.props.headId} subHeadId={this.props.subHeadId}/>
                            : "No details found"}
                            </AccordionDetails>}
                    </Accordion>
                ))}
            </Box>
        )
    }
}

export default DeepReport;
