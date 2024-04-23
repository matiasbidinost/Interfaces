class Eraser {
    constructor(posX, posY, color, context, size){
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.ctx = context;
        this.size = size;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.antX , this.antY);
        this.ctx.lineTo(this.posX , this.posY);
        this.ctx.lineCap = 'square';
        this.ctx.lineWidth = this.size;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    moveTo(posX, posY){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }
}