import Konva from 'konva'

export function drawCircle(x: number | undefined, y: number | undefined) {
    var WIDTH = 400;
    var HEIGHT = 400;
    var NUMBER = 1;

    var stage = new Konva.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    function generateNode() {
        return new Konva.Circle({
            x: x! * 4,
            y: y! * 4,
            radius: 5,
            fill: 'red',
            stroke: 'black',
        });
    }

    for (var i = 0; i < NUMBER; i++) {
        layer.add(generateNode());
    }
    layer.draw();
}
