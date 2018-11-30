class Sprite {
    constructor(name, width, height, totalFramesH, totalFramesV) {
        this.sprite = imageResources[name];
        this.width = width;
        this.height = height;
        this.totalFramesH = totalFramesH;
        this.totalFramesV = totalFramesV
        this.actualFrameH = 0;
        this.actualFrameV = 0;
        this.alpha = 1;
    }
    draw(x, y) {
        context.globalAlpha = this.alpha;
        context.drawImage(
            this.sprite,
            this.actualFrameH * this.width, this.actualFrameV * this.height,
            this.width, this.height,
            x, y,
            this.width, this.height
        );
        context.globalAlpha = 1;
    }
    
}