
class Photo {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.loaded = false;

    }
    loadImage(fileName) {
        let orgWidth = this.width;
        let orgHeight = this.height;

        let img = new Image();
        img.src = URL.createObjectURL(fileName);
        let self = this; // Asignar this a self
        let context = this.ctx;
        context.willReadFrequently = true;

        img.onload = () => {
            const aspectRatio = img.naturalWidth / img.naturalHeight; // Usar img en lugar de this
            let targetWidth = orgWidth;
            let targetHeight = targetWidth / aspectRatio;
            if (targetHeight > orgHeight) {
                targetHeight = orgHeight;
                targetWidth = targetHeight * aspectRatio;
            }
            self.loaded = true;
            self.ctx.drawImage(img, 0, 0, targetWidth, targetHeight); // Usar img en lugar de this
        };
    }
    applyFilter(filter) {
        if (this.loaded) {
            switch (filter) {
                case 'Fnegative':
                    let filterNegative = new Negative(this.ctx);
                    filterNegative.reDraw();
                    break;
                case 'Fsepia':
                    let filterSepia = new Sepia(this.ctx);
                    filterSepia.reDraw();
                    break;
                case 'Fbinarization':
                    let filterBinarization = new Binarization(this.ctx);
                    filterBinarization.reDraw();
                    break;
                case 'Fblur':
                    let filterBlur = new Blur(this.ctx);
                    filterBlur.reDraw();
                    break;
                case 'FonlyEdges':
                    let filterOnlyEdges = new OnlyEdges(this.ctx);
                    filterOnlyEdges.reDraw();
                    break;
                case 'Fbright':
                    let filterBright = new Brightness(this.ctx);
                    filterBright.reDraw();
                    break; 
                case 'Fsaturation':
                    let filterSaturation = new Saturation(this.ctx);
                    filterSaturation.reDraw();
                    break;
            }
        } else {
            console.error('La imagen aún no se ha cargado completamente.');
        }
    }
}