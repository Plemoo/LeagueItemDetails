//import * as PIXI from './pixi.min.js'
import * as PIXI from 'pixi.js'
import { Container, Rectangle } from 'pixi.js';
import button1Img from "../img/pixiImgs/buttons/button1.png";
import button2Img from "../img/pixiImgs/buttons/button2.png"
import button3Img from "../img/pixiImgs/buttons/button3.png"
import birdImg from "../img/pixiImgs/birdSprite.png"
import countdownImg from "../img/pixiImgs/Countdown.png"
import trefferImg from "../img/pixiImgs/treffer.png"

let numberOfBirds = 20
    //let hitsLeftCounter = numberOfBirds + 10;
let allBirdSprites = []
let scoreCounter = 0;
let timeScore = 0;

//let startCounter = new PIXI.Text("3", { fontFamily: 'Arial', fontSize: 40, fill: "blue" });
let selectModeScene = new Container();
selectModeScene.interactive = true;
selectModeScene.buttonMode = true;
selectModeScene.visible = true;
let gameScene = new Container();
gameScene.interactive = true;
gameScene.buttonMode = true;
gameScene.visible = false;
let hitsInFixedTimeMode = false; // Mode where you have a fixed time and have to land as many hits as possible
let timeSpendWithFixedHitsMode = false; // Mode where you have to hit a fixed number of birds that you win 
let endScene = new Container();
endScene.visible = false;
let countdownScene = new Container();
countdownScene.visible = false;
let timeSpend = new PIXI.Text("", { fontFamily: 'Arial', fontSize: 20, fill: "red" });
let startTime;
let yourScore = new PIXI.Text("", { fontFamily: 'Arial', fontSize: 20, fill: "red" });
const app = new PIXI.Application({ backgroundColor: 0xffffff, antialias: true });
//document.getElementById("app").appendChild(app.view);

let ticker = PIXI.Ticker.shared;
ticker.autoStart = false;
ticker.add(moveBirds); // start the ticker (that the birds move) when the counter is finished
app.loader
    // .add("pinguin1", "/img/pinguin.png")
    // .add("pinguin2", "/img/pinguin1.png")
    // .add("pinguin3", "/img/pinguin2.png")
    .add("mode1Button", button1Img)
    .add("mode2Button", button2Img)
    .add("resetGame", button3Img)
    .add("tileset", birdImg)
    .add("countdownTileset", countdownImg)
    .add("hitImg", trefferImg)
    //.add("mode1Button", "../img/pixiImgs/buttons/button1.png")
    // .add("mode2Button", "../img/pixiImgs/buttons/button2.png")
    // .add("resetGame", "../img/pixiImgs/buttons/button3.png")
    // .add("tileset", "../img/pixiImgs/birdSprite.png")
    // .add("countdownTileset", "../img/pixiImgs/Countdown.png")
    // .add("hitImg", "./img/pixiImgs/treffer.png")
    .load(() => {
        // select button to define which game mode you want to play
        let mode1ButtonSprite = PIXI.Sprite.from(button1Img);
        mode1ButtonSprite.interactive = true;
        mode1ButtonSprite.y = app.view.height / 2;
        mode1ButtonSprite.x = app.view.width * 3 / 4;
        selectModeScene.addChild(mode1ButtonSprite);
        // on click the mode is defined and the 
        mode1ButtonSprite.on("click", () => {
            startTime = parseInt(Date.now() / 1000);
            scoreCounter = 0
            score.text = "Score:" + scoreCounter
            ticker.start();
            timeSpendWithFixedHitsMode = false;
            hitsInFixedTimeMode = true;
            countdownScene.visible = true;
            countdownSprite.gotoAndPlay(0);
            countdownSprite.visible = true;
            selectModeScene.visible = false;
        })

        let mode2ButtonSprite = PIXI.Sprite.from(button2Img);
        mode2ButtonSprite.interactive = true;
        mode2ButtonSprite.y = app.view.height / 2;
        mode2ButtonSprite.x = app.view.width / 4;
        selectModeScene.addChild(mode2ButtonSprite)
        mode2ButtonSprite.on("click", () => {
            ticker.start();
            scoreCounter = numberOfBirds; // reset score counter
            score.text = "Score:" + scoreCounter
            timeSpendWithFixedHitsMode = true;
            hitsInFixedTimeMode = false;
            countdownScene.visible = true;
            countdownSprite.gotoAndPlay(0);
            countdownSprite.visible = true;
            selectModeScene.visible = false;
        })

        // create the Countdown after selecting a Mode and before the gameScene starts
        let countdownSprite = createCountdownSprite();
        countdownSprite.onComplete = (() => {
            countdownSprite.visible = false;
            // TODO: Mit jedem neuen Aufruf wird ein neuer Ticker erstellt
            // TODO: Es findet bisher kein Reset der Bird Positionen bei neuem Spiel statt
            gameScene.visible = true;
            startTime = parseInt(Date.now() / 1000);
            // reset the position for the birds
            allBirdSprites.forEach(bird => {
                setSpeedSizeAndPosition(bird);
                bird.visible = true;
            });
        })
        countdownScene.addChild(countdownSprite);

        for (let index = 0; index < numberOfBirds; index++) {
            let birdSprite = createBirdSprite()
            birdSprite.animationSpeed = 0.1; // Speed of how fast the images change
            birdSprite.interactive = true;
            birdSprite.buttonMode = true;
            birdSprite.play();
            gameScene.addChild(birdSprite)
            allBirdSprites.push(birdSprite)
        }

        // let hitsLeft = new PIXI.Text("Hits left:" + hitsLeftCounter, { fontFamily: 'Arial', fontSize: 20, fill: "red" });
        // hitsLeft.interactive = false;
        // hitsLeft.x = 0;
        // hitsLeft.y = 0;
        // gameScene.addChild(hitsLeft);

        // create the Score Text object and add it to the game scnee
        let score = new PIXI.Text("Score:" + scoreCounter, { fontFamily: 'Arial', fontSize: 20, fill: "red" });
        score.interactive = false;
        score.x = app.view.width - 100
        score.y = 0
        gameScene.addChild(score);

        // create and define the time Spend Text and add it to the game scene
        timeSpend.x = 0;
        //timeSpend.x = app.view.width / 2;
        timeSpend.y = 0
        gameScene.addChild(timeSpend)

        // create a general event listener, to count all the clicks (on bird or not)
        // app.renderer.view.addEventListener('mouseup', (e) => {
        //     if (gameScene.visible == true) {
        //         hitsLeftCounter--;
        //         hitsLeft.text = "Hits left:" + hitsLeftCounter;
        //     }
        // });

        // create a click event whenever a bird was hit
        gameScene.on("mousedown", (e) => {
            if (e.target != null && e.target instanceof PIXI.AnimatedSprite) {
                // Mode where you have a fixed time and have to land as many hits as possible
                if (hitsInFixedTimeMode) {
                    setSpeedSizeAndPosition(e.target); // whenever a bird is hit, reset its position
                    scoreCounter++;
                    // Mode where you have to hit a fixed number of birds that you win 
                } else if (timeSpendWithFixedHitsMode) {
                    e.target.visible = false; // hide the hits
                    scoreCounter--;
                }
                score.text = "Score:" + scoreCounter;
            }
        });


        yourScore.x = 200;
        yourScore.y = 200;
        endScene.addChild(yourScore);
        let restartGameButton = PIXI.Sprite.from(button3Img);
        restartGameButton.interactive = true;
        restartGameButton.x = app.view.height / 2;
        restartGameButton.y = 0;
        endScene.addChild(restartGameButton)

        restartGameButton.on("mousedown", () => {
            ticker.stop();
            selectModeScene.visible = true;
            endScene.visible = false;

        })
        app.stage.addChild(selectModeScene);
        app.stage.addChild(gameScene);
        app.stage.addChild(endScene);
        app.stage.addChild(countdownScene);
    });

function createCountdownSprite() {
    let countdownTileset = PIXI.Texture.from(countdownImg);
    let countdownArray = [];
    for (let index = 0; index < 4; index++) {
        if (index == 3) {
            let rectangleTileset = new Rectangle(300, 0, countdownTileset.width - 300, countdownTileset.height)
            let newTexture = new PIXI.Texture(countdownTileset, rectangleTileset);
            countdownArray.push(newTexture);
        } else {
            let rectangleTileset = new Rectangle(index * 100, 0, 100, countdownTileset.height)
            let newTexture = new PIXI.Texture(countdownTileset, rectangleTileset);
            countdownArray.push(newTexture);
        }
    }
    let countdownSprite = new PIXI.AnimatedSprite(countdownArray);
    countdownSprite.animationSpeed = 0.05;
    countdownSprite.loop = false;
    countdownSprite.x = app.view.width / 2 - 50;
    countdownSprite.y = app.view.height / 2;

    return countdownSprite;
}

function createBirdSprite() {
    let spriteArray = [];
    let birdTileset = PIXI.Texture.from(birdImg);
    let imgWidth = parseInt(birdTileset.width / 3);
    let imgHeight = parseInt(birdTileset.height / 3);
    for (let heightindex = 0; heightindex < 3; heightindex++) {
        for (let widthIndex = 0; widthIndex < 3; widthIndex++) {
            let rectangleTileset = new Rectangle(parseInt(widthIndex * imgWidth), parseInt(heightindex * imgHeight), imgWidth, imgHeight)
            let newTexture = new PIXI.Texture(birdTileset, rectangleTileset);
            spriteArray.push(newTexture)
        }
    }
    return new PIXI.AnimatedSprite(spriteArray);
}

function moveBirds() {
    //let invisObjects = 0;
    allBirdSprites.forEach(animSprite => {
        animSprite.x += animSprite.speedX;
        animSprite.y += animSprite.speedY;
        if (animSprite.x > app.view.width ||
            animSprite.y > app.view.height ||
            animSprite.x < -animSprite.height ||
            animSprite.y < -animSprite.width) {
            setSpeedSizeAndPosition(animSprite)
        }
        // if (!animSprite.visible) {
        //     invisObjects++
        // }
    });
    let spendTimeNumber = parseInt(Date.now() / 1000) - startTime;
    if (hitsInFixedTimeMode) {
        let fixedTime = 10;
        timeSpend.text = "Time:" + (fixedTime - spendTimeNumber);
        if (spendTimeNumber >= fixedTime) {
            ticker.stop();
            endScene.visible = true;
            gameScene.visible = false;
        }
        yourScore.text = "You scored: " + scoreCounter;
    } else if (timeSpendWithFixedHitsMode) {
        timeSpend.text = "Time:" + spendTimeNumber;
        if (scoreCounter == 0) {
            timeScore = spendTimeNumber;
            ticker.stop()
            endScene.visible = true;
            gameScene.visible = false;
            yourScore.text = "You needed " + timeScore + " seconds."
        }
    }


}

function setSpeedSizeAndPosition(mc) {
    let size = 20 + 200 * Math.random();
    mc.width = size;
    mc.height = size;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var speedFactor = 0.5
    let randomNumber = Math.random();
    // Set the scaling to a positive number to not have the number from the latest side 
    mc.scale.y = Math.abs(mc.scale.y);
    mc.scale.x = Math.abs(mc.scale.x);

    if (randomNumber < 0.25) { // start left side
        mc.y = Math.random() * app.view.height;
        mc.x = -size;
        mc.speedX = speedFactor + Math.random();
        mc.speedY = (speedFactor + Math.random()) * plusOrMinus;
        let winkel = Math.PI / 2 - Math.atan(Math.abs(mc.speedY / mc.speedX));
        if (mc.speedY < 0) {
            winkel = -(Math.PI / 2 - winkel)
        }
        mc.rotation = winkel
    } else if (randomNumber < 0.5) { // start top side
        mc.y = -size;
        mc.x = Math.random() * app.view.width;
        mc.speedX = (speedFactor + Math.random()) * plusOrMinus;
        mc.speedY = (speedFactor + Math.random());
        let winkel = Math.atan(Math.abs(mc.speedY / mc.speedX));
        if (mc.speedX < 0) {
            winkel = Math.PI - winkel
            mc.scale.y = Math.abs(mc.scale.y) * -1 // spiegelt anhand der y-achse
        }
        mc.rotation = winkel
    } else if (randomNumber < 0.75) { // start bottom side
        mc.y = app.view.height;
        mc.x = parseInt(Math.random() * app.view.width);
        mc.speedX = (speedFactor + Math.random()) * plusOrMinus;
        mc.speedY = (speedFactor + Math.random()) * -1;
        let winkel = -Math.atan(Math.abs(mc.speedY / mc.speedX));
        if (mc.speedX < 0) {
            winkel = (3 * Math.PI) / 2 - Math.atan(Math.abs(mc.speedY / mc.speedX));
            mc.scale.y = Math.abs(mc.scale.y) * -1 // spiegelt anhand der y-achse
        }
        mc.rotation = winkel
    } else { // start right side
        mc.y = parseInt(Math.random() * app.view.width);
        mc.x = app.view.width;
        mc.speedX = (speedFactor + Math.random()) * -1;
        mc.speedY = (speedFactor + Math.random()) * plusOrMinus;
        let winkel = Math.atan(Math.abs(mc.speedY / mc.speedX));
        if (mc.speedY < 0) {
            mc.scale.x = Math.abs(mc.scale.x) * -1 // spiegelt anhand der x-Achse
        } else {
            winkel = -winkel;
            mc.scale.x = Math.abs(mc.scale.x) * -1 // spiegelt anhand der x-Achse
        }
        mc.rotation = winkel
    }
}

export function getApp() {
    return app.view;
}