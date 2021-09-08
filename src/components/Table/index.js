import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Divider, Typography} from "@material-ui/core";
import CustomButton from "../../shared/CustomButton";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function BasicTable(props) {
    const {data = []} = {...props}
    const classes = useStyles();

    return (
        <Paper variant={'outlined'}>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email Id</TableCell>
                            <TableCell align="left">Age</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left" width={130}>Mobile Number</TableCell>
                            <TableCell align="left" width={130}>Employee Id</TableCell>
                            <TableCell align="right" width={80}/>
                            <TableCell align="right" width={80}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.age}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.employeeId}</TableCell>
                                <TableCell align="right">
                                    <CustomButton onClick={() =>  props.onClick({action: 'details', data: row})}>
                                        DETAILS
                                    </CustomButton>
                                </TableCell>
                                <TableCell align="right">
                                    <CustomButton color={'secondary'} onClick={() => props.onClick({action: 'delete', data: row})}>
                                        DELETE
                                    </CustomButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {
                            data.length < 1 &&
                            <Paper elevation={0} component={TableRow}>
                                <Typography component={TableCell}>
                                    No data
                                </Typography>
                            </Paper>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}