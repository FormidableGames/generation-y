//#region Variables declaration

//Canvas
var canvas,
    context,
    canvasWidth, 
    canvasHeight, 
    aspectRatio;
//Resources
var animationStep;
var imageResources,
    audioResources;

//Gameloop
var maxFps,
    timestep,
    delta,
    lastFrameTimeMs,
    currentFps,
    framesThisSecond,
    lastFpsUpdate,
    fpsDisplay;

//Inputs
var inputDisponibility,
    pressedKeys,
    keyMap;

//#endregion Variable declaration

function keydown(event) {
    let key;
    if(event.keyCode === undefined) key = 32;
    else key = event.keyCode;
    pressedKeys[keyMap[key]] = true;
}
function keyup(event) {
    let key;
    if(event.keyCode === undefined) key = 32;
    else key = event.keyCode;
    pressedKeys[keyMap[key]] = false;
    inputDisponibility = true;
}

//Game
var game;

//Level
var level;

//Onload
window.addEventListener("load", function () {
    //Create the canvas and get the context
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvasWidth = canvas.width, 
    canvasHeight = canvas.height;  
    aspectRatio = canvas.width / canvas.height;

    //Responsive canvas
    window.addEventListener("resize", resize, false);
    window.addEventListener("orientationchange", resize, false);
    resize();

    animationStep = 0;

    //Start loading resources
    imageResources = {};
    audioResources = {};

    level = localStorage.getItem("level");
    //Load hell resources
    if(level == "hell"){
        //Load resources
        resourcesLoader(
            //Image list
            [   
                {name: "question", path: "spr_question.png"}, {name: "alert", path: "spr_alert.png"},
                {name: "1", path: "GUI_count1.png"}, {name: "2", path: "GUI_count2.png"},
                {name: "3", path: "GUI_count3.png"}, {name: "fight", path: "GUI_fight.png"},
                {name: "fullHearth", path: "GUI_fullHearth.png"}, {name: "halfHearth", path: "GUI_halfHearth.png"},
                {name: "emptyHearth", path: "GUI_emptyHearth.png"}, {name: "healthContainer", path: "GUI_healthContainer.png"},
                {name: "player", path: "spr_player.png"}, {name: "background", path: "bk_hell0.png"}, {name: "columns", path: "bk_hell1.png"}, 
                {name: "floor", path: "bk_hell2.png"}, {name: "basicEnemy", path: "spr_demon.png"},
                {name: "dodgeEnemy", path: "spr_tengu.png"}, {name: "dodge", path: "spr_dodge.png"}, 
                {name: "illusionistEnemy", path: "spr_hellFox.png"}, {name: "halo", path: "spr_halo.png"}, 
                {name: "fireball", path: "spr_fireball.png"}, {name: "smoke", path: "spr_smoke.png"},
                {name: "hit", path: "spr_hit.png"}
            ],
            //Audio list
            [   
                {name: "musicIntro", path: "aud_hellIntro.ogg", loop: false}, {name: "musicLoop", path: "aud_hellLoop.ogg", loop: true},
                {name: "dash", path: "aud_dash.mp3", loop: false}, {name: "hit", path: "aud_hit.mp3", loop: false},
                {name: "playerHurt", path: "aud_playerHurt.mp3", loop: false}, {name: "fire", path: "aud_fire.mp3", loop: false},
                {name: "protect", path: "aud_protect.mp3", loop: false}
            ]
        );
    }else if(level == "purgatory"){
        resourcesLoader(
            //Image list
            [   
                {name: "question", path: "spr_question.png"}, {name: "alert", path: "spr_alert.png"},
                {name: "1", path: "GUI_count1.png"}, {name: "2", path: "GUI_count2.png"},
                {name: "3", path: "GUI_count3.png"}, {name: "fight", path: "GUI_fight.png"},
                {name: "fullHearth", path: "GUI_fullHearth.png"}, {name: "halfHearth", path: "GUI_halfHearth.png"},
                {name: "emptyHearth", path: "GUI_emptyHearth.png"}, {name: "healthContainer", path: "GUI_healthContainer.png"},
                {name: "player", path: "spr_player.png"}, {name: "background", path: "bk_purgatory0.png"},
                {name: "columns", path: "bk_purgatory1.png"}, {name: "floor", path: "bk_purgatory2.png"},
                {name: "hit", path: "spr_hit.png"}, {name: "attack", path: "spr_katanaAttack.png"},
                {name: "weakSpotEnemy", path: "spr_kappa.png"}, {name: "counterattackEnemy", path: "spr_counter.png"}, 
                {name: "invisibleEnemy", path: "spr_katana.png"}, {name: "aura", path: "spr_aura.png"}
            ],
            //Audio list
            [   
                {name: "musicIntro", path: "aud_purgatoryIntro.ogg", loop: false}, {name: "musicLoop", path: "aud_purgatoryLoop.ogg", loop: true},
                {name: "dash", path: "aud_dash.mp3", loop: false}, {name: "hit", path: "aud_hit.mp3", loop: false},
                {name: "playerHurt", path: "aud_playerHurt.mp3", loop: false}, {name: "appear", path: "aud_appear.mp3", loop: false},
                {name: "swordCollision", path: "aud_swordCollision.mp3", loop: false}, {name: "swordSwing", path: "aud_swordSwing.wav", loop: false},
                {name: "protect", path: "aud_protect.mp3", loop: false}
            ]
        );
    }else if(level == "paradiso"){
        //Load resources
        resourcesLoader(
            //Image list
            [   
                {name: "question", path: "spr_question.png"}, {name: "alert", path: "spr_alert.png"},
                {name: "1", path: "GUI_count1.png"}, {name: "2", path: "GUI_count2.png"},
                {name: "3", path: "GUI_count3.png"}, {name: "fight", path: "GUI_fight.png"},
                {name: "fullHearth", path: "GUI_fullHearth.png"}, {name: "halfHearth", path: "GUI_halfHearth.png"},
                {name: "emptyHearth", path: "GUI_emptyHearth.png"}, {name: "healthContainer", path: "GUI_healthContainer.png"},
                {name: "player", path: "spr_player.png"}, {name: "background", path: "bk_paradiso0.png"}, 
                {name: "columns", path: "bk_paradiso1.png"}, {name: "floor", path: "bk_paradiso2.png"}, 
                {name: "roundOfAttacksEnemy", path: "spr_tiger.png"}, {name: "hit", path: "spr_hit.png"},
                {name: "smoke", path: "spr_smoke.png"}, {name: "attack", path: "spr_tigerAttack.png"},
                {name: "illusionistEnemy", path: "spr_heavenFox.png"}, {name: "fireball", path: "spr_fireball.png"}
            ],
            //Audio list
            [   
                {name: "musicIntro", path: "aud_paradisoIntro.ogg", loop: false}, {name: "musicLoop", path: "aud_paradisoLoop.ogg", loop: true},
                {name: "dash", path: "aud_dash.mp3", loop: false}, {name: "hit", path: "aud_hit.mp3", loop: false},
                {name: "playerHurt", path: "aud_playerHurt.mp3", loop: false}, {name: "fire", path: "aud_fire.mp3", loop: false},
                {name: "protect", path: "aud_protect.mp3", loop: false}
            ]
        );
    }
});

function initialize(){
    window.removeEventListener("keydown", initialize);
    window.removeEventListener("click", initialize);
    window.removeEventListener("touchstart", initialize);

    //Remove the loading screen
    document.getElementById("loadingDiv").remove();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //Initialize all the variables and listeners
    //Input
    inputDisponibility = true;
    pressedKeys = {
        attack: false,
        pause: false
    }
    keyMap = {
        32: 'attack',
        80: 'pause'
    }

    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    canvas.addEventListener("mousedown", keydown, false);
    canvas.addEventListener("mouseup", keyup, false);
    canvas.addEventListener("touchstart", keydown, false);
    canvas.addEventListener("touchend", keyup, false);

    //Gameloop
    maxFps = 60,
    timestep = 1000 / maxFps,
    delta = 0,
    lastFrameTimeMs = 0;
    currentFps = 60;
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    fpsDisplay = document.getElementById('fpsDisplay');
   
    //Game controller
    game = new Game();
    
    //Start game loop
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFps)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= timestep) {
        //Call gameupdate passing the timestep (deltaTime) in ms
        game.update(timestep);
        delta -= timestep;
    }
    //Clear the screen
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //Draw everything
    game.draw();

    //Fps count
    if (timestamp > lastFpsUpdate + 1000) { // update every second
        currentFps = 0.25 * framesThisSecond + (1 - 0.25) * currentFps; // compute the new FPS
 
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;
    fpsDisplay.textContent = Math.round(currentFps) + ' FPS';

    //Loop
    window.requestAnimationFrame(gameLoop);
}

function resourcesLoader(images, audios){
    //Load images and then load audio
    loadImages(images, function() {
        loadSounds(audios, initialize);
    });
}
function loadImages(images, callback) {
    //When all the images are loaded -> callback()
    let name,
        count  = images.length,
        onload = function() { if (--count == 0) callback();}   

    for(let i = 0 ; i < images.length ; i++) {
        //Assing name and path
        name = images[i].name;
        imageResources[name] = document.createElement('img');
        imageResources[name].addEventListener('load', onload);
        imageResources[name].src = "assets/sprites/" + images[i].path;
    }
  
}
function loadSounds(audios, callback) {
    //When all the audio is loaded -> callback()
    let name,
        count  = audios.length,
        canplay = function() { if (--count == 0) {
                load = document.getElementById("loadingDiv");
                load.textContent = "Loaded";
                load.style.color = "#ffffff";
                load.style.backgroundColor = "#ff00bf";
                load.style.animation = "none";
                
                window.addEventListener("keydown", callback, false);
                window.addEventListener("click", callback, false);
                window.addEventListener("touchstart", callback, false);
            }
        };
  
    for(let i = 0 ; i < audios.length ; i++) {
        //Assing name, path and loop
        name = audios[i].name;
        audioResources[name] = document.createElement('audio');
        audioResources[name].addEventListener('canplay', canplay, false);    
        if(audios[i].loop) audioResources[name].loop = true;
        audioResources[name].src = "assets/audio/" + audios[i].path;
        audioResources[name].stop = function(){ this.pause(); this.currentTime = 0; }
    }
  
}
//Resize the screen to fit the new resolution
function resize() {
    let height, width;
    let container = document.getElementById('columnDiv');
    maxHeight = container.clientHeight;
    width = container.clientWidth;
    height = Math.min(width/aspectRatio, maxHeight, 640);
    canvas.style.width = height * aspectRatio + 'px';
    canvas.style.height = height + 'px';
}