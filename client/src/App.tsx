import { useState } from 'react';
import './App.css';
import { generateData } from './generateData';

function App() {
  const [numbInstances, setNumbInstances] = useState<number>(0)
  const [instancesRunning, setInstancesRunning] = useState<boolean>(false)
  const [instances, setInstances] = useState<WebSocket[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumbInstances(parseInt(event.target.value));
  }

  const handleSubmit = () => {
    if (!instancesRunning) {
      setInstancesRunning(true)
      setInstances(generateData(numbInstances))
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Clients Simulator</h1>
          <p>This application can simulate a specific number of clients. Each client represents a vehicle. How many items do you want to start?</p>
          <div className="form-group">
            <input type="number" name="name" autoComplete="off" className="form-control" min="0" max="5" onChange={(event) => handleChange(event)} />
          </div>
          <button type="button" className='button' onClick={() => handleSubmit()}>
            Start Simulation
          </button>

          { instancesRunning && 
            <p>
              Instances running:
              <span className="count">
                {instances.length}
              </span>
            </p>
          }

        </div>
      </div>
    </div>
  );
}

export default App;
