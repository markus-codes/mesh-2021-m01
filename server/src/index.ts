import { App } from "./app";

const port = Number(process.env.PORT) || 3100;
const host = process.env.HOST || "0.0.0.0";

const app = new App();

app.start(port, host);
