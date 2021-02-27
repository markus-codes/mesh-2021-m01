import { createServer, Server } from "http";
import * as WebSocket from "ws";
import { InboundTupel } from "./models/inbound-tupel.model";
import { Tupel } from "./models/tupel";

export class App {
  private httpServer: Server;
  private socketServer: WebSocket.Server;
  private instances: Map<number, Tupel[]> = new Map();

  constructor() {
    this.httpServer = createServer();
    this.socketServer = new WebSocket.Server({ server: this.httpServer });
    this.registerMessageListener();
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
  private registerMessageListener(): void {
    this.socketServer.on("connection", (socket: WebSocket) => {
      socket.on("message", (data: any) => {
        try {
          const request = JSON.parse(data) as InboundTupel;
          this.addTupelToInstance(request.id, request.tupel);
          socket.send(JSON.stringify({ success: true }));
        } catch (exp) {
          console.error("Recived invalid request", exp.message);
          socket.send(JSON.stringify({ success: false, status: "400" }));
        }
      });
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
