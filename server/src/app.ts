import { createServer, IncomingMessage, Server } from 'http';
import * as WebSocket from 'ws';
import { Grid } from './grid';
import { InboundTupel } from './models/inbound-tupel.model';
import { Tupel } from './models/tupel';
import { Vehicle } from './models/vehicle';
export class App {
  private httpServer: Server;
  private sendSocket: WebSocket.Server;

  private instances: Map<number, Vehicle> = new Map();
  private subscribers: WebSocket[] = [];
  private grid: Grid;

  constructor() {
    this.grid = new Grid(10, 10);
    this.httpServer = createServer();
    this.sendSocket = new WebSocket.Server({
      server: this.httpServer
    });
    this.bootstrapSockets();
  }

  /**
   * Start the http server / websocket
   *
   * @param port port to listen
   * @param host host to bind server
   */
  start(port: number, host = '0.0.0.0'): void {
    this.httpServer.listen(port, host, () => {
      console.log(`Listen on ${host}:${port}`);
    });
  }

  /**
   * Register listener to recive messages
   */
  private bootstrapSockets(): void {
    this.sendSocket.on('connection', (socket: WebSocket, request: IncomingMessage) => {
      if (request.url === '/send') {
        this.registerSendSocket(socket);
      } else if (request.url === '/subscribe') {
        this.registerSubsribeSocket(socket);
      }
    });
  }

  /**
   * Register socket to create a new tupel
   *
   * @param socket socket to handle
   */
  private registerSendSocket(socket: WebSocket): void {
    socket.on('message', (data: any) => {
      try {
        const request = JSON.parse(data) as InboundTupel;
        this.addTupelToInstance(request.id, request.tupel);
        this.sendToAllSubscribers(request);
        socket.send(JSON.stringify({ success: true }));
      } catch (exp) {
        console.error('Recived invalid request', exp.message);
        console.log(exp);
        socket.send(JSON.stringify({ success: false, status: '400' }));
      }
    });
  }

  /**
   * Register socket to release processed data
   *
   * @param socket socket to handle
   */
  private registerSubsribeSocket(socket: WebSocket): void {
    this.subscribers.push(socket);
  }

  /**
   * Send a message to all subscribers
   *
   * @param body data to send
   */
  private sendToAllSubscribers(body: unknown): void {
    this.subscribers.forEach((subsciber) => {
      subsciber.send(JSON.stringify(body));
    });
  }

  /**
   * Calculate the grid for an tupel
   *
   * @param tupel tuple to calculate the grid for
   */
  private calculateGrid(tupel: Tupel): Tupel {
    return { x: Math.floor(tupel.x / 10), y: Math.floor(tupel.y / 10) };
  }

  /**
   * Creates or append a tupel for an specific instance
   *
   * @param instanceId id of instance
   * @param tuple tupel to add
   */
  private addTupelToInstance(instanceId: number, tuple: Tupel): void {
    const grid = this.calculateGrid(tuple);
    if (this.instances.has(instanceId)) {
      const currentValue = this.instances.get(instanceId);
      currentValue.currentGrid = grid;
      currentValue.currentLocation = tuple;
      this.instances.set(instanceId, currentValue);
      this.grid.updateLocation(currentValue, grid);
    } else {
      const vehicle: Vehicle = {
        id: instanceId,
        currentGrid: grid,
        currentLocation: tuple,
        isFine: false
      };
      this.instances.set(instanceId, vehicle);
      this.grid.updateLocation(vehicle, grid);
    }
    const neighbors = this.grid.findingNeighbors(grid).filter((v) => v.currentLocation != tuple);

    neighbors.forEach((vehicle) => {
      const distance = this.getDistance(vehicle.currentLocation, tuple);
      if (distance > 1.5) {
        // TODO: Distance is fine
      } else {
        // TODO: Distance to
      }
    });
  }

  /**
   * Calculates the distance between two points
   *
   * @param a coordinates of point a
   * @param b coordinates of point b
   */
  private getDistance(a: Tupel, b: Tupel): number {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }
}
