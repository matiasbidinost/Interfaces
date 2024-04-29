class Brightness{
    constructor(ctx) {
        this.ctx = ctx;
    }

reDraw() {
    let brillo = 30;
    let width = this.ctx.canvas.width;
    let height = this.ctx.canvas.height;
    let imageData = this.ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] += brillo
        imageData.data[i + 1] += brillo
        imageData.data[i + 2] += brillo;
    }
    this.ctx.putImageData(imageData, 0, 0)
}
}