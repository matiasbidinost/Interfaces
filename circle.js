class Circle extends Figure{

    constructor(x, y, color, radius){
        super(x,y,color);
        this.radius = radius;
    }
    draw(ctx){
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    isPointerInside(px, py) {
        let distance = Math.sqrt(Math.pow(px - this.x, 2) + Math.pow(py - this.y, 2));
        return distance < this.radius;
    }
    setStroke(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#FF7A7A";
        ctx.stroke();
    }
}
