import { useEffect } from "react";
import { getPoints } from "../api/websockets";
import { VehicleInterface } from "../types/base";

export function useCreatWebSocket(
  setVehicle: React.Dispatch<React.SetStateAction<VehicleInterface | undefined>>
) {
  const ws = new WebSocket("ws://192.168.178.149:3100/subscribe");

  useEffect(() => {
    getPoints(setVehicle, ws);
  }, []);
}
