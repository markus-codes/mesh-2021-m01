import { Tupel } from "./models/tupel";
import { Vehicle } from "./models/vehicle";

export class Grid {
  private grid: Vehicle[][][];

  constructor(x: number, y: number) {
    this.initGrid(x, y);
  }

  /**
   * Updates the coordinates of a vehicle inside the grid
   *
   * @param vehicle vehicle to update
   * @param tupel new coordinates
   */
  updateLocation(vehicle: Vehicle, tupel: Tupel): void {
    for (let x in this.grid) {
      for (let y in this.grid) {
        this.grid[x][y] = this.grid[x][y].filter((v) => v.id !== vehicle.id);
      }
    }
    this.grid[tupel.x][tupel.y].push(vehicle);
  }

  /**
   * Find all borderd fields inside the grid
   *
   * @param tupel coordinates of field in grid
   */
  findingNeighbors(tupel: Tupel): Vehicle[] {
    var rowLimit = this.grid.length - 1;
    var columnLimit = this.grid[0].length - 1;
    let result = this.grid[tupel.x][tupel.y];

    for (
      var i = Math.max(0, tupel.x - 1);
      i <= Math.min(tupel.x + 1, rowLimit);
      i++
    ) {
      for (
        var j = Math.max(0, tupel.y - 1);
        j <= Math.min(tupel.y + 1, columnLimit);
        j++
      ) {
        if (i !== tupel.x || j !== tupel.y) {
          result = [...result, ...this.grid[i][j]];
        }
      }
    }
    return result;
  }

  /**
   * Initialises a grid with x*y fields
   * @param x
   * @param y
   */
  private initGrid(x: number, y: number) {
    this.grid = [];
    for (let i = 0; i < x; i++) {
      this.grid[i] = [];
      for (let j = 0; j < y; j++) {
        this.grid[i][j] = [];
      }
    }
  }
}
