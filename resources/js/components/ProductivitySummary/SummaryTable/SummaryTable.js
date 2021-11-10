import React from "react";
import {Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";

import nextId from "react-id-generator";

const customTableCellStyle = {
    padding: '5px !important'
}

class SummaryTable extends React.Component {
    constructor(props) {
        super(props);
        this.details = null;
        this.cellCount = 0;
    }
    createTableHeader = () =>
    {
        const row = this.props.rows && this.props.rows[0] || [];
        const headings = Object.keys(row);
        this.cellCount = headings.length;
        return headings.map((heading ) => {
            if(heading === 'details') {
                return null;
            } else {
                return (
                    <TableCell key={nextId()} style={{ color: 'white', fontWeight: 'bold', position: 'relative', padding: '5px' }}>
                        {heading}
                    </TableCell>
                )
            }
        });
    }
    getNextLevel = () => {
        const levels = ['Zone', 'Territory', 'Distributor', 'SR'];
        return levels[levels.indexOf(this.props.level) + 1];
    }
    render() {
        const rows = this.props.rows;
        let {level, zone, territory, distributor, sr} = this.props;
        return (
                <Table>
                    <TableHead style={{ background: '#eb2f23' }}>
                        <TableRow>
                            {this.createTableHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((record, index) => {
                            if(!zone) zone = record.AMCode;
                            if(!territory) territory = record.TerritoryCode;
                            if(!distributor) distributor = record.DistributorCode;
                            this.details = null;
                            let detailsBackup  = null;
                            if(record.details) {
                                this.details = record.details;
                                detailsBackup = [...record.details];
                                delete record.details;
                            }
                            const cells = Object.values(record);
                            let tableRow = <React.Fragment key={nextId()}>
                                    <TableRow
                                        style={{ cursor: 'pointer' }}
                                        key={`productivity-${level}-body-row-${index}`}
                                        onClick={() =>
                                            this.props.expandCb(record.TerritoryCode || record.AMCode, this.getNextLevel(), zone, territory, distributor, sr)
                                        }
                                    >
                                        {cells.map(cell => (
                                            <TableCell key={nextId()} style={{ padding: '5px' }}>
                                                {cell}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {this.details
                                    ? <TableRow>
                                        <TableCell colSpan={this.cellCount}>
                                            <SummaryTable
                                                zone={this.props.zone}
                                                territory={this.props.territory}
                                                distributor={this.props.distributor}
                                                sr={this.props.sr}
                                                level={this.getNextLevel()}
                                                expandCb={this.props.expandCb}
                                                rows={this.details}
                                            />
                                        </TableCell>
                                      </TableRow>
                                    : null}
                                </React.Fragment>;
                            record.details = detailsBackup;
                            return tableRow;
                        })}
                    </TableBody>
                </Table>
        )
    }
}

export default SummaryTable;
