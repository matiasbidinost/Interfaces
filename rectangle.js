class Rectangle  extends Figure{
    constructor(x, y, color, height, width){
        super(x,y,color);
        this.height = height;
        this.width = width;
    }
    draw(ctx){
        super.draw(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    isPointerInside(px, py) {
        return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
    }
    setStroke(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#5EF59F";
        ctx.strokeRect(this.x, this.y,this.width, this.height);
    }
}