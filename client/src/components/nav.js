import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Search from "./Search";
import {Container} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '94vh',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Search Tabs"
                className={classes.tabs}
                indicatorColor="primary"

            >
                <Tab label="Reddit Search" {...a11yProps(0)} />
                <Tab label="Coming Soon" {...a11yProps(1)} />
                <Tab label="API Docs" {...a11yProps(2)} />
                <Tab label="Github" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Container>
                    <Search />
                </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Coming Soon
            </TabPanel>
            <TabPanel value={value} index={2}>
                Coming Soon
            </TabPanel>
            <TabPanel value={value} index={3}>
                <h1>My Github</h1>
                <h2>REDIRECTING...</h2>
                <a href={'//github.com/sell'}>Click Here if not Redirected</a>
            </TabPanel>
        </div>
    );
}