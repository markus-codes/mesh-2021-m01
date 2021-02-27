import Konva from 'konva'
import { WebsocketDataInterface } from '../types/base'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export function drawCircle(currentPoints: WebsocketDataInterface[]) {
    var WIDTH = 400;
    var HEIGHT = 400;

    var stage = new Konva.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    function generateNode(x: number, y: number) {
        return new Konva.Circle({
            x: x * 4,
            y: y * 4,
            radius: 5,
            fill: 'red',
            stroke: 'black',
        });
    }

    currentPoints.map(currentPoint => {
        layer.add(generateNode(currentPoint.tupel.x, currentPoint.tupel.y));
    })

    layer.draw();
}
