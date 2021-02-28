import { Grid } from './grid';
import { Tupel } from './models/tupel';
import { Vehicle } from './models/vehicle';

export class LocationProcessor {
  private activeClients: Map<Number, Vehicle>;
  private grid: Grid;

  constructor() {
    this.activeClients = new Map();
    this.grid = new Grid(170, 360); // 2x max logitued, 2x max latitude
  }

  /**
   * Calculate in which section/field the given coordinate is localized
   *
   * @param coordinate (x,y) tuple to calculate the gird section for
   */
  calculateGridSection(coordinate: Tupel): Tupel {
    return { x: Math.floor((coordinate.x + 85) / 10), y: Math.floor((coordinate.y + 180) / 10) };
  }

  /**
   * Convert degrees to radians
   *
   * @param degrees value
   */
  degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Calculate the distance between to coordinates (pythagoras)
   *
   * @param a first coordinate
   * @param b second coordinate
   */
  calculateDistance(a: Tupel, b: Tupel) {
    const earthRadiusKm = 6371;

    const x = this.degreesToRadians(b.x - a.x);
    const y = this.degreesToRadians(b.y - a.y);

    const axRad = this.degreesToRadians(a.x);
    const bxRad = this.degreesToRadians(b.x);

    const res =
      Math.sin(x / 2) * Math.sin(x / 2) +
      Math.sin(y / 2) * Math.sin(y / 2) * Math.cos(axRad) * Math.cos(bxRad);
    var c = 2 * Math.atan2(Math.sqrt(res), Math.sqrt(1 - res));
    return earthRadiusKm * c * 1000;
  }

  /**
   * Return request client from global client list or null
   *
   * @param id id of client
   */
  getClient(id: number): Vehicle | null {
    if (this.activeClients.has(id)) {
      return this.activeClients.get(id);
    }
    return null;
  }

  /**
   * Check if the distance to all vehicles within the own and all
   * borderd grids is big enough.
   *
   * @param gridSection section of the coordinate
   * @param ownCoordinates coordinates of the vehcile
   * @returns {boolean} true if safety distance is kept
   */
  checkNeighbors(gridSection: Tupel, ownCoordinates: Tupel): boolean {
    const neighbors = this.grid
      .findNeighbors(gridSection)
      .filter((v) => v.currentLocation != ownCoordinates);
    for (const neighbor of neighbors) {
      const distance = this.calculateDistance(ownCoordinates, neighbor.currentLocation);
      if (distance < 1.5) {
        return false;
      }
    }
    return true;
  }

  /**
   * Process the location data to determine distances to other vehicles
   *
   * @param id id of vehicle
   * @param coordinate coordinates of the vehicle
   */
  process(id: number, coordinate: Tupel): Vehicle {
    const gridSection = this.calculateGridSection(coordinate);
    let vehicle = this.getClient(id);
    if (vehicle === null) {
      vehicle = new Vehicle(id);
    }
    vehicle.currentGrid = gridSection;
    vehicle.currentLocation = coordinate;
    vehicle.isFine = this.checkNeighbors(gridSection, coordinate);
    this.grid.updateLocation(vehicle, gridSection);
    return vehicle;
  }
}
