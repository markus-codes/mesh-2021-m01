import { Tupel } from './tupel';

export class Vehicle {
  id: number;
  currentGrid: Tupel;
  currentLocation: Tupel;
  isFine: boolean;

  constructor(id: number) {
    this.id = id;
  }
}
