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
    <div className="App">
      <h1>Client-App</h1>
      <div className="Container">
        <p>How many items do you want to start?</p>
        <input type="number" name="name" id='numbInstances' onChange={(event) => handleChange(event)} />
        <input className='button' type="button" value="Submit" onClick={() => handleSubmit()} />
        <p>Total amount of instances running: {instances.length}.</p>
      </div>
    </div>
  );
}

export default App;
