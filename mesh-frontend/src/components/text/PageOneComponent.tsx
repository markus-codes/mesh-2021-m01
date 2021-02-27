import { Typography } from '@material-ui/core';
import { useStyles } from "./styles";
import { PageOneProps } from '../../types'


export function PageOneComponent(props: PageOneProps) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
        <Typography>
            <h1>Page One</h1>
            <p>Hier steht ein Text</p>
            <p>{props.data}</p>
        </Typography>
        </div>
    )
}