import { WebsocketDataInterface } from '../types/base'

export function getPoints(setPoints: React.Dispatch<React.SetStateAction<WebsocketDataInterface | undefined>>, ws: WebSocket) {
    ws.onmessage = (event) => {
        setPoints(JSON.parse(event.data))
    }
}