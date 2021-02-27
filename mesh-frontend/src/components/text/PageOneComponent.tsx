import { Typography } from '@material-ui/core';
import { useStyles } from "./styles";
import { PageOneProps } from '../../types'
import { useEffect, useState } from 'react'
import { WebsocketDataInterface } from '../../types/base'
import { useCreatWebSocket } from '../../hooks/useCreatWebSocket'
import { drawCircle } from '../../util'

export function PageOneComponent(props: PageOneProps) {
    const classes = useStyles()
    const [vehicle, setVehicle] = useState<WebsocketDataInterface>()
    const [currentPoints, setCurrentPoints] = useState<WebsocketDataInterface[]>([])

    useCreatWebSocket(setVehicle)

    useEffect(() => {
        if (vehicle?.id !== undefined) {
            if (currentPoints.find(currentPoint => currentPoint.id !== vehicle.id)) {
                setCurrentPoints((oldPoints) => {
                    oldPoints[vehicle.id] = vehicle
                    return oldPoints
                })
            } else {
                setCurrentPoints([...currentPoints, vehicle])
            }
        }
    }, [vehicle])

    setTimeout(() => {
        drawCircle(currentPoints)
    }, 1000);

    return (
        <div className={classes.root}>
            <Typography>
                <h1>Page One</h1>
            </Typography>
            <div className={classes.container} id="container"></div>
        </div>
    )
}