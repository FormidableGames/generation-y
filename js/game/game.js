class Game {
    constructor() {     
        this.that = this;

        this.pause =  false;
        
        this.player = new Player();


        this.structure = "SSDSSDS";
        /*this.getJSONFromFile(function(list, that){
            that.structure = list;
        }, this);*/

        this.room = 0;
        this.map = new Map();
        this.particleController = new ParticleController();
        this.GUI = new GUI();
        this.entities = [this.map, this.player, this.particleController, this.GUI];

        audioResources["background"].play();

        this.gameState = "walk";
    }

    /*getJSONFromFile(callback, that){
        $.getJSON('js/game/levels.json', function(data) {
            callback(data.easy, that);
        });
    }*/

    update(deltaTime) {
        this.inputHandler();
        if(!this.pause){
            for (let i = 0; i < this.entities.length; i++) {
                this.entities[i].update(deltaTime);
            }
        }
    }
    draw() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    }
    inputHandler() {
        if(pressedKeys["pause"]){
            if(inputDisponibility){
                this.pause = !this.pause;
                inputDisponibility = false;
            }
        }else if (pressedKeys["attack"]) {
            switch (this.gameState) {
                case "walk":
                    if(inputDisponibility){                                      
                        if(!this.map.moving){
                            if(this.structure.charAt(this.room) != 'S'){
                                this.map.add(this.structure.charAt(this.room));
                            }
                            //Move the map 1 room  
                            this.room++;  
                            this.map.toMove();
                            
                            if(this.player.state == "idle") this.player.toWalk();
                        }

                        inputDisponibility = false;
                    }
                    break;
                case "fightTransition":
                    
                    break;
                case "fight":
                    if(inputDisponibility){
                        if(this.player.state == "idle") this.player.toAttack();
                        inputDisponibility = false;
                    }
                    break;
                case "walkTransition":

                    break;
            }
        }
    }
    toWalk(){
        this.gameState = "walk";
        this.map.enemy = undefined;
        this.player.relocate();
        this.player.toIdle();
    }
    toFightTransition(){
        this.gameState = "fightTransition";
        this.GUI.toFightTransition();
        this.player.relocate();
    }
    toFight(){
        this.gameState = "fight";
        this.map.enemy.toIdle();
        this.player.relocate();
    }
}