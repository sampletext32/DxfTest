
class GridHelper {

    constructor(context, offset, scale) {
        this.context = context;
        this.canvasOffset = offset;
        this.scale = scale;
        this.baseGap = 5 * scale;
    }

    updateScale(scale) {
        this.scale = scale;
        this.baseGap = 5 * scale;
        if (this.baseGap > 80) this.baseGap = (this.baseGap / 10);
        if (this.baseGap < 6) this.baseGap *= 10;
    }

    draw() {
        const ctx = this.context;
        const mrg = 10;
        const w = this.context.canvas.width;
        const h = this.context.canvas.height;
        var gap = this.baseGap;
        var start = 0;

        ctx.fillStyle = "#2c78c1";
        ctx.fillRect(0, 0, w, h);
    
        ctx.strokeStyle = "rgb(255, 255, 255, 0.3)";
    
        // vertical lines
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        start = mrg + this.canvasOffset.x % gap;
        for (let offset = start; offset < w - mrg; offset += gap) {
            ctx.moveTo(offset, mrg);
            ctx.lineTo(offset, h - mrg);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        start = mrg + this.canvasOffset.x % (10 * gap);
        for (let offset = start; offset < w - mrg; offset += 10 * gap) {
            ctx.moveTo(offset, mrg);
            ctx.lineTo(offset, h - mrg);
        }
        ctx.stroke();
    
        // horizontal lines
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        start = mrg + this.canvasOffset.y % gap;
        for (let offset = start; offset < h - mrg; offset += gap) {
            ctx.moveTo(mrg, offset);
            ctx.lineTo(w - mrg, offset);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        start = mrg + this.canvasOffset.y % (10 * gap);
        for (let offset = start; offset < h - mrg; offset += 10 * gap) {
            ctx.moveTo(mrg, offset);
            ctx.lineTo(w - mrg, offset);
        }
        ctx.stroke();
    
        // border
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgb(255, 255, 255, 0.7)";
        ctx.strokeRect(mrg, mrg, w - 20, h - 20);
    
    }

};


export default GridHelper;
