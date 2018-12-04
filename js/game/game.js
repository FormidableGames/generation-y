class Game {
    constructor() {     
        this.that = this;

        this.pause =  false;
        
        this.player = new Player();
        this.enemy = undefined;

        this.structure = levels[level]["easy"][0];
        this.room = 0;
        this.map = new Map();
        this.particleController = new ParticleController();
        this.GUI = new GUI();
        this.entities = [this.map, this.player, this.particleController, this.GUI];

        audioResources["musicIntro"].play();
        audioResources["musicIntro"].addEventListener("ended", function(){
            audioResources["musicLoop"].play();
        })

        this.gameState = "walk";
    }

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

                            this.entities.sort(function(a, b) {
                                return a.depth - b.depth;
                            });
                        }

                        inputDisponibility = false;
                    }
                    break;
                case "fight":
                    if(inputDisponibility){
                        if(this.player.state == "idle") this.player.toAttack();
                        inputDisponibility = false;
                    }
                    break;
            }
        }
    }
    toWalk(){
        this.gameState = "walk";
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
        this.enemy.toIdle();
        this.player.relocate();
    }
    toWalkTransition(){
        this.removeEnemy();
        this.gameState = "walkTransition";
        this.player.state = "endFight"
    }
    removeEnemy(){        
        for(let i = 0; i < this.entities.length; i++){
            if(this.entities[i] == this.enemy) {
                let hola = this.entities.splice(i, 1);
            }
        }
        this.enemy = undefined;
    }
}