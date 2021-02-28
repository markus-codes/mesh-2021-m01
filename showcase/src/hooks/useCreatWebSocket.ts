import * as dotenv from "dotenv";
import { useEffect } from "react";
import { getPoints } from "../api/websockets";
import { VehicleInterface } from "../types/base";

dotenv.config();

export function useCreatWebSocket(
  setVehicle: React.Dispatch<React.SetStateAction<VehicleInterface | undefined>>
) {
  const ws = new WebSocket(process.env.REACT_APP_SERVER_URL + "/subscribe");

  useEffect(() => {
    getPoints(setVehicle, ws);
  }, []);
}
