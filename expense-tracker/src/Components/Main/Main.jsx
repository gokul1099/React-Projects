import React from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'
import useStyles from "./style"
import List from "./List/List"
import Form from "./Form/Form"
const Main = () => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by speechly" />
            <CardContent>
                <Typography variant="h5" alight="center">Total Balance = : $100</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: "1.5em", marginTop: "20px" }}>
                    Try saying: Add income for $100
                </Typography>
                <Divider />
                <Form />
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
export default Main
