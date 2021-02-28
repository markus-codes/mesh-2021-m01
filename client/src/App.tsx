import { useState } from "react";
import "./App.css";
import { loadRoutes } from "./load-routes";

function App() {
  const [instancesRunning, setInstancesRunning] = useState<boolean>(false);

  const start = () => {
    if (!instancesRunning) {
      setInstancesRunning(true);
      loadRoutes();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Clients Simulator</h1>
          <p>
            This application can simulate a specific number of clients. Each
            client represents a vehicle. You can start only one instance per browser window. 
            For a reset reload the window.
          </p>

        {! instancesRunning &&  <button type="button" className="button" onClick={() => start()}>
            Load Routes
          </button>}
        </div>
      </div>
    </div>
  );
}

export default App;
