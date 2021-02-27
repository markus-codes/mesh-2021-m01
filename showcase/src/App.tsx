import './App.css';
import { useEffect, useState } from 'react'
import { WebsocketDataInterface } from './types/base'
import { useCreatWebSocket } from './hooks/useCreatWebSocket'
import { Stage, Layer, Circle } from 'react-konva'

function App() {
  const [vehicle, setVehicle] = useState<WebsocketDataInterface>()
  const [currentPoints, setCurrentPoints] = useState<WebsocketDataInterface[]>([])

  useCreatWebSocket(setVehicle)

  useEffect(() => {
    if (vehicle?.id !== undefined) {
      if (currentPoints.find(currentPoint => currentPoint.id !== vehicle.id)) {
        setCurrentPoints((oldPoints) => {
          oldPoints[vehicle.id] = vehicle
          return oldPoints
        })
      } else {
        setCurrentPoints([...currentPoints, vehicle])
      }
    }
  }, [vehicle])

  return (
    <div className="App">
      <h1>Page One</h1>
      <div className={'container'}>
        <Stage width={400} height={400}>
          <Layer>
            {currentPoints.map(point => <Circle x={point.tupel.x * 4} y={point.tupel.y * 4} stroke="black" fill='red' radius={2 * 4} />)}   
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
