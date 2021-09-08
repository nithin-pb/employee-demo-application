import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid'
import BasicTable from "../Table";
import {Box} from "@material-ui/core";
import CustomButton from "../../shared/CustomButton";
import Title from "./Title";
import {useHistory} from "react-router-dom";
import service from "../../service";
import CustomAlert from "../../shared/Alert";
import Loading from "../../shared/Loading";
import CustomSnackBar from "../../shared/CustomSnackBar";
import NewEmployee from "../Employee/NewEmployee";

export default function Dashboard() {
    const history = useHistory();
    const [newEmployeeOpen, setNewEmployeeOpen] = useState(false);
    const [apiProgress, setApiProgress] = useState({loading: false, data: [], error: false});
    const [deleteProgress, setDeleteProgress] = useState({loading: false, data: false, error: false});

    const handleTableAction = (e) => {
        if (e.action === 'details') {
            history.push(`/employee/${e.data.employeeId}`);
        } else if (e.action === 'delete') {
            handleDelete(e.data.employeeId).then()
        }
    }

    const fetchData = async () => {
        try {
            setApiProgress({loading: true, data: [], error: false})
            const {data: {data}} = await service.employee().getAllEmployees();
            setApiProgress({loading: false, data: data, error: false})
        } catch (e) {
            setApiProgress({loading: false, data: [], error: true})
        }
    }

    const handleDelete = async (employeeId) => {
        try {
            setDeleteProgress({loading: true, data: false, error: false})
            const {data: {data}} = await service.employee().deleteEmployee(employeeId);
            await fetchData();
            setDeleteProgress({loading: false, data: data, error: false})
        } catch (e) {
            setDeleteProgress({loading: false, data: false, error: true})
        }
    }

    useEffect(() => {
        fetchData().then()
    }, [newEmployeeOpen])

    return (
        <Grid container className={'master-container container'}>
            <CustomSnackBar open={deleteProgress.data} message={'Selected employee deleted'}/>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
                    <Title title={'Employee Information'} subTitle={'Update/Delete new employee data'}/>
                    {
                        newEmployeeOpen &&
                        <NewEmployee open={newEmployeeOpen} onClick={() => setNewEmployeeOpen(false)}/>
                    }

                    <CustomButton color={'primary'} onClick={() => setNewEmployeeOpen(true)}>
                        New Employee
                    </CustomButton>
                </Box>
                {
                    apiProgress.loading && <Loading message={'Loading employee information'}/>
                }
                <CustomAlert open={apiProgress.error} severity={'error'}
                             message={'Something went wrong. Please try later'}/>
                <BasicTable onClick={handleTableAction} data={apiProgress.data}/>
            </Grid>
        </Grid>
    )
}