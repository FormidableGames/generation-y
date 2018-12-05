class Tile{
    constructor(name, x, y, width, height, depth){
        this.sprite = new Sprite(name, width, height, 1, 1);
        this.x = x;
        this.y = y;
        this.depth = depth;
    }
    update(deltaTime){
        if(this.x <= -canvasWidth)
            this.x += 2 * canvasWidth;
        else if(this.x >= canvasWidth)
            this.x -= 2 * canvasWidth;

    }
    draw(){
        this.sprite.draw(this.x, this.y);
    }
}