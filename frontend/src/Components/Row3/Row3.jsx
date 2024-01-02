import React, { useState, useEffect } from 'react';
import './Row3.css';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PieChart } from '@mui/x-charts/PieChart';
import GirlRoundedIcon from '@mui/icons-material/GirlRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import Model from './Model';
import axios from 'axios';

function Row3(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const [empData, setEmpData] = useState([]);
    const [fcount, setFcount] = useState(0);
    const [mcount, setMcount] = useState(0);

    const [open, setOpen] = useState(false);
    const handleModelClose = (value) => {
        setOpen(value);
    };

    const handleSubmited = (data) => {
        axios.post("http://localhost:3001/addEmp", data).then((response) => {
            console.log(response.data);
            setOpen(false);
            setEmpData(response.data.employee);
            setFcount(response.data.fcount);
            setMcount(response.data.mcount);
            props.lengthed(response.data.totalLen);
        }).catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        setEmpData(props.dbData.employee);
        setFcount(props.dbData.fcount);
        setMcount(props.dbData.mcount);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [props]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid className="m-0" item xs={12} md={8}>
                    <div className="py-3 px-4 row3Div shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <button type="button" className="addBtn px-4 py-1" onClick={() => setOpen(!open)}>Add</button>
                            </div>
                            <div>
                                <form className="d-flex">
                                    <input type="text" placeholder="Search Employee" name="empName" id="inputEmployeeName" className="me-3 px-2" />
                                    <button type="submit" className="searchBtn px-2 py-1"><SearchIcon /></button>
                                </form>
                            </div>
                        </div>
                        <div className="my-2"></div>
                        <div className="d-flex table-container">
                            <table className="table m-0">
                                <thead>
                                    <tr>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Department</th>
                                        <th>Age</th>
                                        <th>Salary</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(empData) && empData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>{item.firstName}</td>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>{item.lastName}</td>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>{item.department}</td>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>{item.age}</td>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>{item.monthlySalary}</td>
                                                <td className={`${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                                                    <button type="button" className="editBtn">Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
                <Grid className="m-0" item xs={12} md={4}>
                    <div className="py-3 px-4 row3Div shadow-sm">
                        <div>
                            <h3 className="row3ColHead m-0 fs-6 mb-2">Employee Composition</h3>
                        </div>
                        <div style={{ height: "11.2rem" }} className="position-relative">
                            <PieChart
                                colors={['rgb(2, 178, 175)', '#5a33eb']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: mcount, label: 'Male' },
                                            { id: 1, value: fcount, label: 'Female' }
                                        ],
                                        innerRadius: 50,
                                        outerRadius: 80,
                                        paddingAngle: 0,
                                        cornerRadius: 0,
                                        startAngle: 0,
                                        endAngle: 360,
                                        cx: (windowWidth > 990) ? 150 : 175,
                                    }
                                ]}
                            />
                            <div className="labelF pe-2 py-1 rounded shadow">
                                <p className="m-0"><GirlRoundedIcon className="genderIconF" />{fcount}%</p>
                            </div>
                            <div className="labelM pe-2 py-1 rounded shadow">
                                <p className="m-0"><BoyRoundedIcon className="genderIconM" />{mcount}%</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="m-0 totalEmpMsg">{props.dbData.totalEmp} employees total</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Model condition={open} onClose={handleModelClose} submited={handleSubmited} />
        </>
    );
}

export default Row3;
