import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from "./styles";

export function PageTwoComponent() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
        <Typography>
            <h1>Page Two</h1>
            <p>Hier steht ein Text</p>
            <Button variant="contained" color='primary'>Test</Button>
        </Typography>

        </div>
    )
}