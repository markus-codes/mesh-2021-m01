const routes = require("./data/routes.json");

export const loadRoutes = () => {
  const socket = new WebSocket("ws://192.168.178.149:3100/send");
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
