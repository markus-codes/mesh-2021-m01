import { createServer, IncomingMessage, Server } from 'http';
import * as WebSocket from 'ws';
import { LocationProcessor } from './location-processor';
import { InboundTupel } from './models/inbound-tupel.model';
export class App {
  private httpServer: Server;
  private sendSocket: WebSocket.Server;
  private subscribers: WebSocket[] = [];

  private readonly twoDemensionalProcessor: LocationProcessor;

  constructor() {
    this.twoDemensionalProcessor = new LocationProcessor();
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
        console.log(request);

        const vehicle = this.twoDemensionalProcessor.process(request.id, request.tupel);
        this.sendToAllSubscribers(vehicle);
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
}
