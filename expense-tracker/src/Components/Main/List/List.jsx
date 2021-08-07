import React, { useContext } from 'react'
import useStyles from "./style"
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from "@material-ui/core"
import { Delete, MoneyOff } from "@material-ui/icons"
import { ExpenseTrackerContext } from '../../../Context/Context'

const List = () => {
    const classes = useStyles()
    const { deleteTransaction, transaction } = useContext(ExpenseTrackerContext)


    return (
        <MUIList dense={false} className={classes.list}>
            {transaction.map((item) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={item.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={item.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.categoy} secondary={`$${item.amount} - ${item.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(item.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List
