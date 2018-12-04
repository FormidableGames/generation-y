class Map {
    constructor() {
        this.tiles = [];
        this.depth = 0;

        this.addBasicTiles(0);
        this.addBasicTiles(canvasWidth);

        this.initialWalkTime = 0.5; //In seconds
        this.walkTime = this.initialWalkTime;

        this.spd = canvasWidth / this.initialWalkTime;
        
        this.moving = false;
    }
    update(deltaTime){
        switch(game.gameState){
            case "walk":
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
                    if(game.enemy) game.enemy.x -= this.spd * (deltaTime / 1000);
                    if(this.walkTime <= 0){
                        this.moving = false;
                        this.walkTime = this.initialWalkTime;
                        game.player.toIdle();
                        if(game.enemy) game.toFightTransition();
                    }
                } 
                break;
            case "walkTransition":
                let nextVariation = game.player.spd/6 * deltaTime;
                if(game.player.x + nextVariation < game.player.positions["walk"]){
                    for (let i = 0; i < this.tiles.length; i++) {
                        //Parallax
                        switch(this.tiles[i].depth){
                            case 0:
                                this.tiles[i].x += nextVariation * 0.25;
                                break;
                            case 1:
                                this.tiles[i].x += nextVariation * 0.5;
                                break;
                            case 2:
                                this.tiles[i].x += nextVariation;
                                break;
                        }
                    }
                }
                else if(game.player.x - nextVariation > game.player.positions["walk"]){
                    for (let i = 0; i < this.tiles.length; i++) {
                        //Parallax
                        switch(this.tiles[i].depth){
                            case 0:
                                this.tiles[i].x -= nextVariation * 0.25;
                                break;
                            case 1:
                                this.tiles[i].x -= nextVariation * 0.5;
                                break;
                            case 2:
                                this.tiles[i].x -= nextVariation;
                                break;
                        }
                    }
                }
                break;
        }
        
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].update(deltaTime);
        }    
    }
    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
        if(game.enemy) game.enemy.draw();
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
                game.enemy = new BasicEnemy();
                break;
            case '2':
                game.enemy = new DodgeEnemy();
                break;
            case '3':
                game.enemy = new BasicEnemyIllusion();
                break;
            case 'Q':
                game.enemy = new HellIllusionistEnemy();
                break;
            case '4':
                game.enemy = new WeakSpotEnemy();
                break;
            case '5':
                game.enemy = new CounterattackEnemy();
                break;
            case '6':
                game.enemy = new InvisibleEnemy();
                break;
            case '7':
                game.enemy = new RoundOfAttacksEnemy();
                break;
            case '8':
                game.enemy = new RoundOfAttacksEnemyIllusion();
                break;
            case 'W':
                game.enemy = new HeavenIllusionistEnemy();
                break;
            case '9':
                game.enemy = new BasicEnemy();
                break;

        }
        game.entities.push(game.enemy);
    }
    
}