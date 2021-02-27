import { WebsocketDataInterface } from '../types/base'
import { getPoints } from '../api/websockets'
import { useEffect } from 'react'

export function useCreatWebSocket(setVehicle: React.Dispatch<React.SetStateAction<WebsocketDataInterface | undefined>>) {
    const ws = new WebSocket('ws://192.168.178.149:3100/subscribe');

    useEffect(() => {
        getPoints(setVehicle, ws)
    }, [])
}
