import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ExpenseTrackerContext } from '../../../Context/Context'
import { v4 as uuidv4 } from 'uuid'
import useStyles from "./style"
import { incomeCategories, expenseCategories } from '../../../Constants/Categories'
import formatDate from '../../../utils/formatDate'
const initialState = {
    amount: "",
    category: "",
    type: "",
    date: formatDate(new Date()),
}
const Form = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
        addTransaction(transaction)
        setFormData(initialState)
    }
    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type </InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category </InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((category) => (
                            <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullwidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>

            <Grid item xs={6}>
                <TextField type="date" label="Date" fullwidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" onClick={createTransaction} fullWidth>Create</Button>
        </Grid>
    )
}

export default Form
