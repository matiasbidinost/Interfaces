
class Binarization {
    constructor(ctx) {
        this.ctx = ctx;
    }
    reDraw() {
        let imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            // Calcula la luminosidad del píxel
            let luminance = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);

            // Aplica un umbral para la binarización
            let threshold = 128;
            let newValue = (luminance < threshold) ? 0 : 255;

            // Establece los nuevos valores de los componentes RGB
            data[i] = newValue;         // R
            data[i + 1] = newValue; // G
            data[i + 2] = newValue; // B
        }

        this.ctx.putImageData(imageData, 0, 0);
    }


}