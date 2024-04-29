class Negative{
    constructor(ctx){
        this.ctx = ctx;
    }

    reDraw() {
        let imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];     // Invertir el componente rojo
            data[i + 1] = 255 - data[i + 1]; // Invertir el componente verde
            data[i + 2] = 255 - data[i + 2]; // Invertir el componente azul
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

}
