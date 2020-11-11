import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import PageviewIcon from '@material-ui/icons/Pageview';
import Close from "@material-ui/icons/Close";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { TableHead } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Dispenses(props) {
    const classes = useStyles();
    const { dispenses } = props;
    const tableCellClasses = classnames(classes.tableCell);
    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Diagnosis Code</TableCell>
                    <TableCell>Hospital</TableCell>
                    <TableCell>Patient First Name</TableCell>
                    <TableCell>Item </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dispenses.map(dispense => (
                    <DispenseRow dispense={dispense} />
                ))}
            </TableBody>
        </Table>
    );

    function DispenseRow(props) {
        const [open, setOpen] = React.useState(false);
        const { dispense } = props;
        return (
            <React.Fragment>
                <TableRow key={dispense.id} className={classes.tableRow}>
                    <TableCell className={tableCellClasses}>10</TableCell>
                    <TableCell className={tableCellClasses}>{dispense.product.name}</TableCell>
                    <TableCell className={tableCellClasses}>{dispense.patient.firstName}</TableCell>
                    <TableCell className={tableCellClasses}>{dispense.product.name}</TableCell>

                    <TableCell className={classes.tableActions}>
                        <Tooltip
                            id="tooltip-top"
                            title="View Dispense"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <IconButton
                                aria-label="PageView"
                                className={classes.tableActionButton}
                            >
                                <PageviewIcon
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.PageviewIcon
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            id="tooltip-top-start"
                            title="Reject Dispense"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}
                            >
                                <Close
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.close
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>

            </React.Fragment>
        )
    }
}

Dispenses.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
};
//Hospital, patient, item