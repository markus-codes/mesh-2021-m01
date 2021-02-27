import { WebsocketDataInterface } from '../types/base'
import { getPoints } from './websockets'
import { useEffect } from 'react'

export function useCreatWebSocket(setPoints: React.Dispatch<React.SetStateAction<WebsocketDataInterface | undefined>>) {
    const ws = new WebSocket('ws://192.168.178.149:3100/subscribe');

    useEffect(() => {
        getPoints(setPoints, ws)
    }, [])
}
