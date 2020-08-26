import React from 'react';
import { AppContext } from '../AppContext';
import CanvasControls from './CanvasControls';
import GridHelper from '../models/GridHelper';
import '../styles/Canvas.css';

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        // BINDINGS
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.zoom = this.zoom.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.canvasRef = React.createRef();

        // CANVAS-RELATED VARIABLES
        this.ctx = undefined;
        this.gridHelper = undefined;
        this.scale = 3.0;
        this.offset = { x: 0, y: 0 };
    }

    componentDidMount() {
        this.init();
        window.addEventListener("resize", this.onWindowResize);
    }

    onWindowResize = () => {
        if (this.canvasRef.current) {
            this.resizeCanvas();
            this.drawFrame();
        }
    }

    init() {
        const canvasCurr = this.canvasRef.current;
        this.ctx = canvasCurr.getContext('2d');
        this.resizeCanvas();

        // TODO: remove this bullshit
        this.offset.x = canvasCurr.width / 3;
        this.offset.y = canvasCurr.height / 3;
        this.gridHelper = new GridHelper(this.ctx, this.offset, this.scale);
        this.drawFrame();
    }

    resizeCanvas() {
        this.canvasRef.current.height = window.innerHeight;
        this.canvasRef.current.width = window.innerWidth;
    }

    drawFrame() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.gridHelper.draw();
        this.drawPlot();
        this.ctx.restore();
    }

    drawPlot() {
        const ctx = this.ctx;
        const offset = this.offset;
        const scale = this.scale;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;

        this.context.dxf.entities.forEach(el => {
            ctx.beginPath();
            switch (el[0]) {
                case "line":
                    ctx.moveTo(scale * el[1] + offset.x, scale * el[2] + offset.y);
                    ctx.lineTo(scale * el[3] + offset.x, scale * el[4] + offset.y);
                    break;
                case "circle":
                    ctx.arc(scale * el[1] + offset.x, scale * el[2] + offset.y, scale * el[3], 0, 2 * Math.PI);
                    break;
                case "arc":
                    ctx.arc(scale * el[1] + offset.x, scale * el[2] + offset.y, scale * el[3], el[4], el[5]);
                    break;
                case "lwpolyline":
                case "spline":
                    ctx.moveTo(scale * el[1][0] + offset.x, scale * el[1][1] + offset.y);
                    for (let j = 1; j < el.length - 1; j++) {
                        ctx.quadraticCurveTo(
                            scale * el[j][0] + offset.x,
                            scale * el[j][1] + offset.y,
                            scale * el[j + 1][0] + offset.x,
                            scale * el[j + 1][1] + offset.y
                        );
                    }
                    break;

                default:
                    break;
            }
            ctx.stroke();
        });

    }

    handleMouseMove(e) {
        if (e.buttons === 1) {
            this.offset.x += e.movementX;
            this.offset.y += e.movementY;
            window.requestAnimationFrame(() => { this.drawFrame() });
        }
    }

    handleMouseWheel(e) {
        this.zoom(Math.sign(e.deltaY));
    }

    zoom(sign) {
        this.scale = this.getNewScale(sign);
        this.gridHelper.updateScale(this.scale);
        window.requestAnimationFrame(() => { this.drawFrame() });
    }

    getNewScale(delta) {
        // TODO: Move this to config
        const minScaleLim = 0.1, maxScaleLim = 30.0;

        var scale = this.scale;
        scale -= delta * 0.1 * Math.sqrt(scale);
        if (scale < minScaleLim) scale = minScaleLim;
        if (scale > maxScaleLim) scale = maxScaleLim;
        return scale;
    }

    render() {
        return (
            <div>
                <canvas
                    ref={this.canvasRef}
                    onMouseMove={this.handleMouseMove}
                    onWheel={this.handleMouseWheel}
                    id="canvas">
                </canvas>
                <CanvasControls zoom={this.zoom}/>
            </div>
        );
    }
}


Canvas.contextType = AppContext;

export default Canvas;
