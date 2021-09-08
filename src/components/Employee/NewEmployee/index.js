import React, {useState} from 'react';
import CustomDialog from "../../../shared/CustomDialog";
import {Box, Collapse, Grid} from "@material-ui/core";
import CustomTextField from "../../../shared/CustomTextField";
import CustomButton from "../../../shared/CustomButton";
import useForm from "../../../hooks/useForm";
import useValidation from "../../../hooks/useValidation";
import service from "../../../service";
import CustomAlert from "../../../shared/Alert";

export default function NewEmployee(props) {
    const {open: dialogOpen} = {...props}
    const [formData, setFormData] = useForm({name: '', employeeId: '', address: '', phone: '', email: '', age: ''})
    const [validation, setValidation] = useValidation({
        name: true,
        employeeId: true,
        address: true,
        phone: true,
        email: true,
        age: true
    })
    const [progress, setProgress] = useState({loading: false, data: false, error: false});
    let disabled = true

    const handleButtonClick = async () => {
        try {
            setProgress({loading: true, data: false, error: false})
            const {data: {data}} = await service.employee().createEmployee(formData);
            setProgress({loading: false, data: data, error: false})
        } catch (e) {
            setProgress({loading: false, data: false, error: true})
        }
    }


    disabled = !(Object.values(validation).every(e => e) && Object.values(formData).every(e => Boolean(e)))
    const handleChange = (e) => {
        setFormData(e);
        setValidation(e.target.name, e.target.value);
    }

    return (
        <CustomDialog open={dialogOpen} onClick={() => props.onClick(false)} title={'New employee'} size={'md'}>
            <Box mb={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.name}
                                         label={'Name'}
                                         required
                                         name={'name'}
                                         value={formData.name}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.employeeId}
                                         label={'Employee Id'}
                                         required
                                         name={'employeeId'}
                                         value={formData.employeeId}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.address}
                                         label={'Address'}
                                         required
                                         name={'address'}
                                         value={formData.address}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.phone}
                                         label={'Phone Number'}
                                         name={'phone'}
                                         required
                                         helperText={!validation.phone ? 'Invalid phone number' : ''}
                                         value={formData.phone}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.email}
                                         label={'Email'}
                                         name={'email'}
                                         type={'email'}
                                         required
                                         helperText={!validation.email ? 'Invalid email address' : ''}
                                         value={formData.email}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextField onChange={handleChange}
                                         error={!validation.email}
                                         label={'Age'}
                                         name={'age'}
                                         type={'number'}
                                         required
                                         value={formData.age}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton color={'primary'} style={{width: 100}} disabled={disabled}
                                      onClick={handleButtonClick}> Save </CustomButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={progress.loading}>
                            Loading...
                        </Collapse>
                        <CustomAlert open={progress.data} severity={'success'} message={'Employee added'}/>
                        <CustomAlert open={progress.error} severity={'error'} message={'Failed to add user'}/>
                    </Grid>
                </Grid>
            </Box>
        </CustomDialog>
    )
}
