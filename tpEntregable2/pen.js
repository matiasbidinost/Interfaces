
class Pen{
    constructor(posX, posY, fill, context, size){
        this.size=size;
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.fill = fill;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.moveTo(this.antX , this.antY);
        this.ctx.lineTo(this.posX , this.posY);
        this.ctx.lineCap = 'round'; //cambia el puntero del que  viene por defecto a un circulo
        this.ctx.lineWidth = this.size;//define el valor para el tamaño de la linea (lineWidth)
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