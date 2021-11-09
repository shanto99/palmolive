import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import nextId from "react-id-generator";

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
                    <TableCell key={nextId()}>
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
        const {level, zone, territory, distributor, sr} = this.props;
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.createTableHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((record, index) => {
                            this.details = null;
                            if(record.details) {
                                this.details = record.details;
                                delete record.details;
                            }
                            const cells = Object.values(record);
                            return (
                                <React.Fragment key={nextId()}>
                                    <TableRow
                                        key={`productivity-${level}-body-row-${index}`}
                                        onClick={() =>
                                            this.props.expandCb(record.AMCode, this.getNextLevel(), zone, territory, distributor, sr)
                                        }
                                    >
                                        {cells.map(cell => (
                                            <TableCell key={nextId()}>
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
                                                rows={this.details}
                                            />
                                        </TableCell>
                                      </TableRow>
                                    : null}
                                </React.Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default SummaryTable;
