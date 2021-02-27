import './App.css';
import { useEffect, useState } from 'react'
import { VehicleInterface } from './types/base'
import { useCreatWebSocket } from './hooks/useCreatWebSocket'
import { Stage, Layer, Circle } from 'react-konva'

function App() {
  const [vehicle, setVehicle] = useState<VehicleInterface>()
  const [currentPoints, setCurrentPoints] = useState<VehicleInterface[]>([])

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
            {currentPoints.map((point, i) =>
              <Circle key={i} x={point.currentLocation.x * 4} y={point.currentLocation.y * 4} stroke="black" fill={point.isFine ? 'green' : 'red'} radius={2 * 4} />)
            }
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
