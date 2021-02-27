interface Points {
    startX: number,
    startY: number,
    endX: number,
    endY: number
}

export function createInstance(startPoints: Points, instanceID: number) {
    const ws = new WebSocket('ws://192.168.178.149:3100');
    // const ws = new WebSocket('ws://192.168.178.35:3100');

    const divX = startPoints.endX - startPoints.startX
    const divY = startPoints.endY - startPoints.startY
    const amountSteps = divX >= divY ? divX : divY

    let x = 0
    let y = 0
    let nextPointX = 0
    let nextPointY = 0

    const points = new Array(amountSteps + 1 < 0 ? (amountSteps + 1) * -1 : amountSteps + 1)
    for (let i = 0; i < points.length; i++) {

        if (divX > 0 && divY > 0) {
            nextPointX = startPoints.startX + i
            nextPointY = startPoints.startY + i
        } else if (divX < 0 && divY > 0) {
            nextPointX = startPoints.startX - i
            nextPointY = startPoints.startY + i
        } else if (divX > 0 && divY < 0) {
            nextPointX = startPoints.startX + i
            nextPointY = startPoints.startY - i
        } else if (divX < 0 && divY < 0) {
            nextPointX = startPoints.startX - i
            nextPointY = startPoints.startY - i
        }

        if (nextPointX <= startPoints.endX && divX > 0 || nextPointX >= startPoints.endX && divX < 0) {
            x = nextPointX
        }
        if (nextPointY <= startPoints.endY && divY > 0 || nextPointY >= startPoints.endY && divY < 0) {
            y = nextPointY
        }

        points[i] = { x: x, y: y }
    }

    ws.onopen = () => {
        points.map((point, i) => {
            setTimeout(() => {
                ws.send(JSON.stringify({ tupel: point, id: instanceID }))
                console.log({tupel: point, id: instanceID})
            }, 1000*i)
        })
    }
}
