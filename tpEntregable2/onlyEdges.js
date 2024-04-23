class OnlyEdges {
    constructor(ctx) {
        this.ctx = ctx;
    }

    reDraw() {
        const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const data = imageData.data;
        const width = this.ctx.canvas.width;
        const height = this.ctx.canvas.height;

        // Aplicar filtro Gaussiano
        const gaussianKernel = [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1]
        ];
        const applyGaussian = (x, y) => {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const pixelIndex = ((y + i) * width + (x + j)) * 4;
                    sum += data[pixelIndex] * gaussianKernel[i + 1][j + 1];
                }
            }
            return sum / 16;
        };

        // Aplicar filtro Sobel
        const sobelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        const sobelY = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];
        const applySobel = (x, y, kernel) => {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const pixelIndex = ((y + i) * width + (x + j)) * 4;
                    sum += applyGaussian(x + j, y + i) * kernel[i + 1][j + 1];
                }
            }
            return sum;
        };

        // Aplicar el filtro Sobel en dirección X e Y
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const pixelIndex = (y * width + x) * 4;
                const gradientX = applySobel(x, y, sobelX);
                const gradientY = applySobel(x, y, sobelY);
                const magnitude = Math.sqrt(gradientX * gradientX + gradientY * gradientY);

                // Asignar el valor de la magnitud a los componentes RGB
                data[pixelIndex] = magnitude; // rojo
                data[pixelIndex + 1] = magnitude; // verde
                data[pixelIndex + 2] = magnitude; // azul
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}


