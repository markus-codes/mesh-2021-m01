import '../App.css';
import { useEffect, useState } from 'react'
import { VehicleInterface } from '../types/base'
import { useCreatWebSocket } from '../hooks/useCreatWebSocket'
import { Stage, Layer, Circle, Line } from 'react-konva'

function StaticSim() {
  const [vehicle, setVehicle] = useState<VehicleInterface>()
  const [currentPoints, setCurrentPoints] = useState<VehicleInterface[]>([])

  const width= 400 
  const height= 400

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
        <Stage width={width} height={height}>
          <Layer>
            <Line points={[width / 10 * 1, 0, width / 10 * 1, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 2, 0, width / 10 * 2, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 3, 0, width / 10 * 3, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 4, 0, width / 10 * 4, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 5, 0, width / 10 * 5, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 6, 0, width / 10 * 6, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 7, 0, width / 10 * 7, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 8, 0, width / 10 * 8, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[width / 10 * 9, 0, width / 10 * 9, height]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />

            <Line points={[0, height / 10 * 1, width, height / 10 * 1]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 2, width, height / 10 * 2]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 3, width, height / 10 * 3]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 4, width, height / 10 * 4]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 5, width, height / 10 * 5]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 6, width, height / 10 * 6]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 7, width, height / 10 * 7]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 8, width, height / 10 * 8]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
            <Line points={[0, height / 10 * 9, width, height / 10 * 9]} stroke={'grey'} strokeWidth={1} dash={[10, 10]} />
          </Layer>
          <Layer>
            {currentPoints.map((point, i) =>
              <Circle key={i} x={point.currentLocation.x * 4} y={point.currentLocation.y * 4} stroke="black" fill={point.isFine ? 'green' : 'red'} radius={1 * 4} />)
            }
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default StaticSim;
