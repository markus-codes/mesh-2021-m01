import { createServer, Server } from "http";
import * as WebSocket from "ws";
import { InboundTupel } from "./models/inbound-tupel.model";

export class App {
  private httpServer: Server;
  private socketServer: WebSocket.Server;

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
          const parsedObject = JSON.parse(data) as InboundTupel;
          socket.send({ success: true });
        } catch (exp) {
          console.error("Recived invalid request");
          socket.send({ success: false, status: "400" });
        }
      });
    });
  }
}
