class Map {
    constructor() {
        this.enemy = undefined;
        this.item = undefined;
        this.tiles = [];
        this.addBasicTiles(0);
        this.addBasicTiles(canvasWidth);

        this.initialWalkTime = 0.5; //In seconds
        this.walkTime = this.initialWalkTime;

        this.spd = canvasWidth / this.initialWalkTime;
        
        this.moving = false;
    }
    update(deltaTime){
        if(this.moving){
            this.walkTime -= deltaTime / 1000;  
            for (let i = 0; i < this.tiles.length; i++) {
                //Parallax
                switch(this.tiles[i].depth){
                    case 0:
                        this.tiles[i].x -= this.spd * (deltaTime / 1000) * 0.25;
                        break;
                    case 1:
                        this.tiles[i].x -= this.spd * (deltaTime / 1000) * 0.5;
                        break;
                    case 2:
                        this.tiles[i].x -= this.spd * (deltaTime / 1000);
                        break;
                }
            }
            if(this.enemy) this.enemy.x -= this.spd * (deltaTime / 1000);
            if(this.walkTime <= 0){
                this.moving = false;
                this.walkTime = this.initialWalkTime;
                game.player.toIdle();
                if(this.enemy) game.toFightTransition();
            }
        } 
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].update(deltaTime);
        }
        if(this.enemy) this.enemy.update(deltaTime);       
    }
    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
        if(this.enemy) this.enemy.draw();
    }
    toMove(){
        this.moving = true;            
        this.spd = canvasWidth / this.initialWalkTime;
    }
    //Add the basic tiles
    addBasicTiles(xPos){
        let floor = new Tile("floor", xPos, 0, 960, 640, 2);
        let columns = new Tile("columns", xPos, 0, 960, 640, 1);
        let bg = new Tile("background", xPos, 0, 960, 640, 0);

        this.tiles.push(columns, floor, bg);
        this.tiles.sort(function(a, b) {
            return a.depth - b.depth;
        });
    }
    add(char){
        switch(char){
            case '1':
                this.enemy = new BasicEnemy();
                break;
            case '2':
                this.enemy = new DodgeEnemy();
                break;
            case '3':
                this.enemy = new BasicEnemyIllusion();
                break;
            case 'I':
                this.enemy = new IllusionistEnemy();
                break;
            case '4':
                this.enemy = new WeakSpotEnemy();
                break;
            case '5':
                this.enemy = new CounterattackEnemy();
                break;
            case '6':
                this.enemy = new InvisibleEnemy();
                break;
            case '7':
                this.enemy = new BasicEnemy();
                break;
            case '8':
                this.enemy = new BasicEnemy();
                break;
            case '9':
                this.enemy = new BasicEnemy();
                break;

        }
    }
    
}