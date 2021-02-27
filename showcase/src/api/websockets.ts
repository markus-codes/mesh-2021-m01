import { WebsocketDataInterface } from '../types/base'

export function getPoints(setVehicle: React.Dispatch<React.SetStateAction<WebsocketDataInterface | undefined>>, ws: WebSocket) {
    ws.onmessage = (event) => {
        setVehicle(JSON.parse(event.data))
    }
}