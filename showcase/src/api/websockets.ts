import { VehicleInterface } from "../types/base";

export function getPoints(
  setVehicle: React.Dispatch<
    React.SetStateAction<VehicleInterface | undefined>
  >,
  ws: WebSocket
) {
  ws.onmessage = (event) => {
    setVehicle(JSON.parse(event.data));
  };
}
