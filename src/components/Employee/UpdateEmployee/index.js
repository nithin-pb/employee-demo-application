import React, {useEffect, useState} from 'react'
import {Box, CircularProgress, Collapse, Grid, Paper} from "@material-ui/core";
import CustomTextField from "../../../shared/CustomTextField";
import CustomButton from "../../../shared/CustomButton";
import useForm from "../../../hooks/useForm";
import useValidation from "../../../hooks/useValidation";
import Title from "../../Dashboard/Title";
import {useParams} from 'react-router-dom'
import service from '../../../service/'
import CustomAlert from "../../../shared/Alert";
import Loading from "../../../shared/Loading";

export default function UpdateEmployee(props) {
    const {employeeId} = useParams()
    const [state, setState] = useState({name: '', employeeId: '', address: '', phone: '', email: '', age: ''})
    const [edit, setEdit] = useState(true);
    const [validation, setValidation] = useValidation({
        name: true,
        employeeId: true,
        address: true,
        phone: true,
        email: true,
        age: true
    })
    const [apiProgress, setApiProgress] = useState({loading: false, data: [], error: false});
    const [updateProgress, setUpdateProgress] = useState({loading: false, data: false, error: false});

    const fetchData = async () => {
        try {
            setApiProgress({loading: true, data: [], error: false})
            const {data: {data}} = await service.employee().getSelectedEmployee(employeeId);
            setApiProgress({loading: false, data: data, error: false})
            setState({
                name: data.name,
                employeeId: data.employeeId,
                address: data.address,
                phone: data.phone,
                email: data.email,
                age: data.age
            })
        } catch (e) {
            setApiProgress({loading: false, data: [], error: true})
        }
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
        setValidation(e.target.name, e.target.value);
    }

    const handleButtonClick = async () => {
        try {
            setUpdateProgress({loading: true, data: false, error: false})
            const {data: {data}} = await service.employee().updateEmployee(state);
            setUpdateProgress({loading: false, data: data, error: false})
        } catch (e) {
            setUpdateProgress({loading: false, data: false, error: true})
        }
    }


    useEffect(() => {
        fetchData().then()
    }, [])

    return (
        <Paper variant={'outlined'}>
            <Box m={3}>
                <Title title={'Update User'} subTitle={'update user with id xx6666'}/>
            </Box>
            <CustomAlert open={apiProgress.error} severity={'error'}
                         message={'Unable to load data for the employee'}/>
            <Box m={3} mb={3}>
                {
                    apiProgress.loading && <Loading message={`Loading data for ${employeeId}`}/>
                }
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={edit}
                                         error={!validation.name}
                                         label={'Name'}
                                         required
                                         name={'name'}
                                         value={state.name}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={true}
                                         error={!validation.employeeId}
                                         label={'Employee Id'}
                                         required
                                         name={'employeeId'}
                                         value={state.employeeId}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={edit}
                                         error={!validation.address}
                                         label={'Address'}
                                         required
                                         name={'address'}
                                         value={state.address}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={edit}
                                         error={!validation.phone}
                                         label={'Phone Number'}
                                         name={'phone'}
                                         required
                                         helperText={!validation.phone ? 'Invalid phone number' : ''}
                                         value={state.phone}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={edit}
                                         error={!validation.email}
                                         label={'Email'}
                                         name={'email'}
                                         type={'email'}
                                         required
                                         helperText={!validation.email ? 'Invalid email address' : ''}
                                         value={state.email}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         disabled={edit}
                                         error={!validation.age}
                                         label={'Age'}
                                         name={'age'}
                                         type={'number'}
                                         required
                                         value={state.age}/>
                    </Grid>
                    <Grid item xs={12}>
                        {edit ?
                            <CustomButton style={{width: 100}}
                                          onClick={() => setEdit((old) => !old)}> edit </CustomButton> :
                            <CustomButton color={'primary'} style={{width: 100}}
                                          onClick={handleButtonClick}> Save </CustomButton>}
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={updateProgress.loading}>
                            Loading...
                        </Collapse>
                        <CustomAlert open={updateProgress.data} severity={'success'}
                                     message={'Employee updated'}/>
                        <CustomAlert open={updateProgress.error} severity={'error'}
                                     message={'Failed to update employee'}/>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}
