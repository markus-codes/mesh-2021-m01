import { Tupel } from './tupel';

export interface Vehicle {
  id: number;
  currentGrid: Tupel;
  currentLocation: Tupel;
  isFine: boolean;
}
