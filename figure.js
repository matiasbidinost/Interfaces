class Figure {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
    }
    isPointerInside(pointerX, pointerY){
    }
    setStroke(ctx){
    }
}