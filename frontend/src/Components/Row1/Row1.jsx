import React from "react";
import './Row1.css';
import { Grid } from '@mui/material';
import MovingIcon from '@mui/icons-material/Moving';

function Row1(props) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid className="m-0" item xs={12} md={3}>
                    <div className="gridDiv px-4 py-3 shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3 className="empHead m-0 fs-6 mb-2">Total Employees</h3>
                            </div>
                            <div className="">
                                <p className="incP bckg m-0"><MovingIcon className="incP" style={{ marginBottom: ".1rem" }} fontSize="1rem" />&nbsp;100.0%</p>
                            </div>
                        </div>
                        <div>
                            <p className="m-0 fs-4 empNo">{props.dbData.totalEmp}</p>
                        </div>
                        <div>
                            <p className="m-0 empName">Employee</p>
                        </div>
                    </div>
                </Grid>
                <Grid className="m-0" item xs={12} md={3}>
                    <div className="gridDiv dumpy shadow-sm">

                    </div>
                </Grid>
                <Grid className="m-0 " item xs={12} md={6}>
                    <div className="gridDiv dumpy shadow-sm">

                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default Row1;