import { Typography } from '@material-ui/core';
import { useStyles } from "./styles";
import { PageOneProps } from '../../types'
import { useState } from 'react'
import { WebsocketDataInterface } from '../../types/base'
import { useCreatWebSocket } from '../../api/useCreatWebSocket'
import { drawCircle } from '../../util'  

export function PageOneComponent(props: PageOneProps) {
    const classes = useStyles()
    const [points, setPoints] = useState<WebsocketDataInterface>()

    useCreatWebSocket(setPoints)
    setTimeout(() => {
        drawCircle(points?.tupel.x, points?.tupel.y)    
    }, 1000);


    return (
        <div className={classes.root}>
            <Typography>
                <h1>Page One</h1>
                <p>Hier steht ein Text</p>
                <p>{props.data}</p>
                <p>X: {points?.tupel.x}</p>
                <p>Y: {points?.tupel.y}</p>
            </Typography>
            <div className={classes.container} id="container"></div>
        </div>
    )
}