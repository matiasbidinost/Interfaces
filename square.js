class Square extends Figure {
    constructor(x, y, color, size) {
        super(x, y, color);
        this.size = size;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    isPointerInside(px, py) {
        return px >= this.x && px <= this.x + this.size && py >= this.y && py <= this.y + this.size;
    }
    setStroke(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#FF85CF";
        ctx.strokeRect(this.x, this.y,this.size, this.size);
    }
}