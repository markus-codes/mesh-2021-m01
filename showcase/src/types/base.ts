
export interface WebsocketDataInterface {
    id: number,
    tupel: {
        x: number,
        y: number
    }
}

export interface VehicleInterface {
    id: number;
    currentGrid: Tupel;
    currentLocation: Tupel;
    isFine: boolean;
}

export interface Tupel {
    x: number;
    y: number;
}