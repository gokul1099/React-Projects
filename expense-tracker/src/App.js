import React from 'react'
import { Grid } from "@material-ui/core"
import Details from "./Components/Details/Details"
import Main from "./Components/Main/Main"
import useStyles from './style'

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={0} alighItem="centers" justify="center" style={{ height: "100vh" }} className={classes.grid}>
                <Grid item xs={12} sm={4} className={classes.mobile}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
        </div>
    )
}

export default App
