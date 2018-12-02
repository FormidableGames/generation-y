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
    level = 0;
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
    drawProgressIndicator();

    //Start loading resources
    imageResources = {};
    audioResources = {};

    //Load hell resources
    if(level == 0){
        //Load resources
        resourcesLoader(
            //Image list
            [   
                {name: "player", path: "placeholderPlayer.png"}, {name: "enemy", path: "placeholderEnemy.png"},
                {name: "background", path: "bk_hell0.png"}, {name: "columns", path: "bk_hell1.png"}, 
                {name: "floor", path: "bk_hell2.png"}, {name: "dodgeEnemy", path: "placeHolderDodgeEnemy.png"},
                {name: "textParticles", path: "textParticles.png"}, {name: "illusionistEnemy", path: "placeHolderIllusionistEnemy.png"},
                {name: "halo", path: "placeHolderHalo.png"}, {name: "fireball", path: "placeHolderFireBall.png"},
                {name: "smoke", path: "placeHolderHumo.png"}, {name: "weakSpotEnemy", path: "placeHolderWeakEnemy.png"},
                {name: "counterattackEnemy", path: "placeHolderCounterattackEnemy.png"}, {name: "invisibleEnemy", path: "placeHolderInvisibleEnemy.png"}
            ],
            //Audio list
            [   
                {name: "background", path: "MusicaPurgatorio_v2.ogg", loop: true}, {name: "dash", path: "dash.mp3", loop: false},
                {name: "hit", path: "hit.mp3", loop: false}
            ]
        );
    }
});

function initialize(){
    window.removeEventListener("keydown", initialize);
    window.removeEventListener("click", initialize);
    window.removeEventListener("touchstart", initialize);

    //Remove the loading screen
    //document.getElementById("loading").remove();
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
                /*load = document.getElementById("loading");
                load.textContent = "Loaded";
                load.style.color = "#ffffff";
                load.style.backgroundColor = "#ff00bf";
                load.style.animation = "none";*/
                context.textBaseline = 'middle';
                context.textAlign = "center";
                context.font="10vh Arial";
                context.fillText("Loaded", canvasWidth/2, canvasWidth/2);
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
function drawProgressIndicator(){
    context.save();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.translate(canvasWidth / 2, canvasHeight/ 2);
    context.scale(0.4, 0.4);
    context.rotate(-Math.PI / 2);
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.lineWidth = 8;
    context.lineCap = "round";
    var step = animationStep;
    context.fillStyle = "black";
    context.save();
    context.rotate(step * Math.PI / 30);
    context.strokeStyle = "#33ccff";
    context.fillStyle = "#33ccff";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(68, 0);
    context.stroke();
    context.fill();
    context.restore();
    context.beginPath();
    context.lineWidth = 14;
    context.strokeStyle = 'gray';
    context.arc(0, 0, 80, 0, Math.PI * 2, true);
    context.stroke();
    context.restore();
    animationStep += 10;
}