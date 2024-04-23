
class Photo {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.loaded = false;
        this.imageData = null;

    }
    loadImage(fileName) {
        let orgWidth = this.width;
        let orgHeight = this.height;

        let img = new Image();
        img.src = URL.createObjectURL(fileName);
        let context = this.ctx;
        img.onload = function () {
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let targetWidth = orgWidth;
            let targetHeight = targetWidth / aspectRatio;
            if (targetHeight > orgHeight) {
                targetHeight = orgHeight;
                targetWidth = targetHeight * aspectRatio;
            }
            context.drawImage(this, 0, 0, targetWidth, targetHeight);
        };
    }
    Fnegative(){
        let filterNegative = new Negative(this.ctx);
        filterNegative.reDraw();
    }
    Fsepia(){
        let filterSepia = new Sepia(this.ctx);
        filterSepia.reDraw();
    }
    Fbinarization(){
        let filterBinarization = new Binarization(this.ctx);
        filterBinarization.reDraw();
    }
    Fblur(){
        let filterBlur = new Blur(this.ctx);
        filterBlur.reDraw();
    }
    FonlyEdges(){
        let filterOnlyEdges = new OnlyEdges(this.ctx);
        filterOnlyEdges.reDraw();
    }

}