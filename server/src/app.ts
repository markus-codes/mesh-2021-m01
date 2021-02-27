import { createServer, IncomingMessage, Server } from "http";
import * as WebSocket from "ws";
import { InboundTupel } from "./models/inbound-tupel.model";
import { Tupel } from "./models/tupel";
export class App {
  private httpServer: Server;
  private sendSocket: WebSocket.Server;

  private instances: Map<number, Tupel[]> = new Map();
  private subscribers: WebSocket[] = [];

  constructor() {
    this.httpServer = createServer();
    this.sendSocket = new WebSocket.Server({
      server: this.httpServer,
    });
    this.bootstrapSockets();
  }

  /**
   * Start the http server / websocket
   *
   * @param port port to listen
   * @param host host to bind server
   */
  start(port: number, host = "0.0.0.0"): void {
    this.httpServer.listen(port, host, () => {
      console.log(`Listen on ${host}:${port}`);
    });
  }

  /**
   * Register listener to recive messages
   */
  private bootstrapSockets(): void {
    this.sendSocket.on(
      "connection",
      (socket: WebSocket, request: IncomingMessage) => {
        if (request.url === "/send") {
          this.registerSendSocket(socket);
        } else if (request.url === "/subscribe") {
          this.registerSubsribeSocket(socket);
        }
      }
    );
  }

  /**
   * Register socket to create a new tupel
   *
   * @param socket socket to handle
   */
  private registerSendSocket(socket: WebSocket): void {
    socket.on("message", (data: any) => {
      try {
        const request = JSON.parse(data) as InboundTupel;
        this.addTupelToInstance(request.id, request.tupel);
        this.sendToAllSubscribers(request);
        socket.send(JSON.stringify({ success: true }));
      } catch (exp) {
        console.error("Recived invalid request", exp.message);
        socket.send(JSON.stringify({ success: false, status: "400" }));
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
   * Creates or append a tupel for an specific instance
   *
   * @param instanceId id of instance
   * @param tupel tupel to add
   */
  private addTupelToInstance(instanceId: number, tupel: Tupel): void {
    if (this.instances.has(instanceId)) {
      const currentValue = this.instances.get(instanceId);
      currentValue.push(tupel);
      this.instances.set(instanceId, currentValue);
    } else {
      this.instances.set(instanceId, [tupel]);
    }
  }
}
