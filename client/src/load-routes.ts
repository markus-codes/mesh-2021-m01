import * as dotenv from "dotenv";
const routes = require("./data/routes.json");

dotenv.config();

export const loadRoutes = () => {
  const socket = new WebSocket(process.env.REACT_APP_SERVER_URL + "/send");
  const routeCount = routes.length;
  socket.onopen = function () {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        for (let j = 0; j < routeCount; j++) {
          socket.send(JSON.stringify({ tupel: routes[j][i], id: j }));
        }
      }, 1000 * i);
    }
  };
};
