import { createInstance } from './createInstance'

export function generateData(numbInstances: number) {
    const allPoints = new Array(numbInstances)

    for (let i = 0; i < allPoints.length; i++) {
        allPoints[i] = { startX: Math.floor(Math.random() * 100), 
                         startY: Math.floor(Math.random() * 100),
                         endX: Math.floor(Math.random() * 100),
                         endY: Math.floor(Math.random() * 100) }
      }
      
    allPoints.map((points, instanceID) => createInstance(points, instanceID))
}