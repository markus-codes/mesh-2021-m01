import { VehicleInterface } from '../types/base'
import { getPoints } from '../api/websockets'
import { useEffect } from 'react'

export function useCreatWebSocket(setVehicle: React.Dispatch<React.SetStateAction<VehicleInterface | undefined>>) {
    const ws = new WebSocket('ws://192.168.178.149:3100/subscribe');

    useEffect(() => {
        getPoints(setVehicle, ws)
    }, [])
}
