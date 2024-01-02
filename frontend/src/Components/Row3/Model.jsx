import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, styled, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, MenuItem, Checkbox, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const departments = ['Front-End', 'Back-End'];
const hodNameMappings = {
    'Front-End': 'Someone',
    'Back-End': 'Other than someone',
};

function Model(props) {
    const { register, handleSubmit, setValue, watch } = useForm();

    const onSubmit = (data) => {
        props.submited(data);
    };

    const watchDepartment = watch('department');
    const handleClose = () => {
        props.onClose(false);
    };

    useEffect(() => {
        if (watchDepartment) {
            setValue('hodName', hodNameMappings[watchDepartment]);
        }
    }, [watchDepartment, setValue]);

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.condition}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Employee
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent className='pb-0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField label="First Name" {...register('firstName')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Middle Name" {...register('middleName')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Last Name" {...register('lastName')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Department"
                                    fullWidth
                                    {...register('department')}
                                    InputLabelProps={{ shrink: true }}
                                >
                                    {departments.map((department) => (
                                        <MenuItem key={department} value={department}>
                                            {department}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="DOB" type="date" fullWidth {...register('dob')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField select label="Gender" fullWidth {...register('gender')} InputLabelProps={{ shrink: true }}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Qualification" fullWidth {...register('qualification')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Monthly Salary" fullWidth {...register('monthlySalary')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Email" type="email" fullWidth {...register('email')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Mobile" fullWidth {...register('mobile')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={6}>
                                    <Checkbox {...register('isHOD')} />
                                    <label>Is HOD</label>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="HOD Name" disabled fullWidth {...register('hodName')} InputLabelProps={{ shrink: true }} />
                            </Grid>
                        </Grid>
                        <DialogActions className='mt-3 pe-0'>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}

export default Model;
