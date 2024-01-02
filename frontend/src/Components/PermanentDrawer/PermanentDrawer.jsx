import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from '@mui/material';
import "./PermanenetDrawer.css";
import Row1 from '../Row1/Row1';
import Row2 from '../Row2/Row2';
import Row3 from '../Row3/Row3';

import {
    Menu as MenuIcon,
    SpaceDashboardOutlined as SpaceDashboardOutlinedIcon,
    BusinessCenterOutlined as BusinessCenterOutlinedIcon,
    AccountBoxOutlined as AccountBoxOutlinedIcon,
    CalendarMonthOutlined as CalendarMonthOutlinedIcon,
    Person2Outlined as Person2OutlinedIcon,
    SettingsOutlined as SettingsOutlinedIcon,
} from '@mui/icons-material';
import axios from 'axios';

const drawerWidth = 210;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [data, setData] = useState({});
    const [len, setLen] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001").then((response) => {
            console.log(response.data);
            setData(response.data);
            setLen(Object.keys(response.data).length);
        }).catch((err) => {
            console.error(`Error: ${err}`);
        });
    }, []);

    const handleLen = (data) => {
        console.log(1 + " " + data);
        setLen(data)
    }

    const drawer = (
        <div>
            <Toolbar />
            <List> <ListItem key={"dashboard"} className='active'>
                <ListItemButton>
                    <ListItemIcon>
                        <SpaceDashboardOutlinedIcon className='iconsDash activeIcon' />
                    </ListItemIcon>
                    <ListItemText className='activeText' primary={"Dashboard"} />
                </ListItemButton>
            </ListItem>
                <Toolbar />
                <ListItem key={"employee"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <i class="bi bi-person-vcard empIcon"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Employees"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"company"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BusinessCenterOutlinedIcon className='iconsDash' />
                        </ListItemIcon>
                        <ListItemText primary={"Company"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"candidate"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxOutlinedIcon className='iconsDash' />
                        </ListItemIcon>
                        <ListItemText primary={"Candidate"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"calender"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthOutlinedIcon className='iconsDash' />
                        </ListItemIcon>
                        <ListItemText primary={"Calender"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider className="my-3 p-0" />
            <List>
                <ListItem key={"profile"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Person2OutlinedIcon className='iconsDash' />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"settings"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsOutlinedIcon className='iconsDash' />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                className='drawing'
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <div className=''>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                        className='m-0 p-0 mb-2'
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                {/* <Toolbar /> */}
                <div className='px-lg-4 my-lg-3 m-0 p-0 gridSys'>
                    <Row1 dbData={data} lengthed={len} />
                    <div className='my-3'></div>
                    <Row2 dbData={data} />
                    <div className='my-3'></div>
                    <Row3 dbData={data} lengthed={handleLen} />
                </div>
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;