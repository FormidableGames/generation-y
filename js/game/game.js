class Game {
    constructor() {     
        this.that = this;

        this.pause =  false;
        
        this.player = new Player();
        this.enemy = undefined;
        this.killedEnemyList = [];

        //Difficulty
        this.wins = localStorage.getItem("wins");
        this.losses = localStorage.getItem("losses");
        if(this.wins == undefined || isNaN(this.wins)) this.wins = 0;
        if(this.losses == undefined || isNaN(this.losses)) this.losses = 0;
        this.totalGames = this.wins + this.losses;
        //3 games or less OR <70% winrate -> easy
        //70% winrate -> medium
        //90% winrate -> hard

        if(this.totalGames > 3 && this.wins*100/this.totalGames >= 90)
            this.difficulty = "hard";
        else if(this.totalGames > 3 && this.wins*100/this.totalGames >= 70)
            this.difficulty = "medium";
        else
            this.difficulty = "easy";
        let repeating = localStorage.getItem("repeat");
        if(repeating == "true") this.structure = localStorage.getItem("levelStructure", this.structure);
        else this.structure = levels[level][this.difficulty][Math.floor(Math.random()*levels[level][this.difficulty].length)];
        
        localStorage.setItem("levelStructure", this.structure);
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
                            if(this.room < this.structure.length && this.structure.charAt(this.room) != 'S')
                                this.map.add(this.structure.charAt(this.room));
                            else if(this.room == this.structure.length)
                                this.toGameOver();

                            //Move the map 1 room  
                            this.room++;  
                            
                            this.map.toMove();
                            
                            if(this.player.state == "idle") this.player.toWalk();
                            
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
        if(this.enemy.identifier == 6) 
            this.particleController.create("question", this.player.x + this.player.width/2, this.player.y);  
        this.enemy.toIdle();
        this.player.relocate();
    }
    toWalkTransition(){
        this.killedEnemyList.push(this.enemy.identifier);
        localStorage.setItem("killedEnemyList", this.killedEnemyList);
        this.removeEnemy();
        this.gameState = "walkTransition";
        this.player.toEndFight();
    }
    toGameOver(){
        var fade = {     
            fadeAlpha: 0,
            depth: 7,
            update:function(){
                let step = 0.01;
                this.fadeAlpha += step;
                if(this.fadeAlpha < 1) {
                    audioResources["musicIntro"].volume = Math.floor((1 - this.fadeAlpha)*100)/100;
                    audioResources["musicLoop"].volume = Math.floor((1 - this.fadeAlpha)*100)/100;
                }
                if(this.fadeAlpha >= 1.1) {
                    window.location = "gameOver.html";
                }
            },
            draw:function(){
                context.globalAlpha = this.fadeAlpha;
                context.fillRect(0, 0, canvasWidth, canvasHeight);
                context.globalAlpha = 1.0;
            }
        }
        this.entities.push(fade);
        if(this.player.health > 0) this.wins++;
        else this.losses++;
        localStorage.setItem('wins', this.wins);
        localStorage.setItem("losses", this.losses);

        localStorage.setItem("alreadySent", false);
    }
    removeEnemy(){        
        for(let i = 0; i < this.entities.length; i++){
            if(this.entities[i] == this.enemy) {
                this.entities.splice(i, 1);
            }
        }
        this.enemy = undefined;
    }
}