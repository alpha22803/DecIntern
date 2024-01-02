/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Row2.css';
import { AgChartsReact } from 'ag-charts-react';

function getData() {
    return [
        { quarter: "Jan", iphone: 40, mac: 20 },
        { quarter: "Feb", iphone: 70, mac: 20 },
        { quarter: "Mar", iphone: 60, mac: 30 },
        { quarter: "Apr", iphone: 55, mac: 25 },
        { quarter: "May", iphone: 40, mac: 20 },
        { quarter: "Jun", iphone: 40, mac: 30 },
        { quarter: "Jul", iphone: 60, mac: 10 },
        { quarter: "Aug", iphone: 77, mac: 23 },
        { quarter: "Sep", iphone: 20, mac: 5 },
        { quarter: "Oct", iphone: 58, mac: 22 },
        { quarter: "Nov", iphone: 30, mac: 15 },
        { quarter: "Dec", iphone: 80, mac: 20 },
    ];
}

function Row2() {
    const [options, setOptions] = useState({
        data: getData(),
        series: [
            {
                type: 'bar',
                xKey: 'quarter',
                yKey: 'iphone',
                stacked: true,
                yName: 'iPhone',
                fill: '#5a33eb',
            },
            {
                type: 'bar',
                xKey: 'quarter',
                stacked: true,
                yKey: 'mac',
                yName: 'Mac',
                fill: '#f2f0fe',
            },
        ],
        legend: {
            enabled: false,
        },
        yAxis: {
            type: 'number',
            title: {
                text: 'Y-Axis',
            },
            tick: {
                count: 6,
                interval: 20,
            },
        },
    });

    return (
        <div className="py-3 px-4 row2Div shadow-sm">
            <div className='mb-2'>
                <h3 className="row2ColHead m-0">Department wise employee count</h3>
            </div>
            <div className='barGraph'>
                <AgChartsReact options={options} />
            </div>
        </div>
    );
}

export default Row2;
