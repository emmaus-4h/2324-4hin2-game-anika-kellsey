/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
// de spelstatussen
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;

// zorgen dat score en highscore aan het begin van de game 0 zijn
var score = 0;
let highscore = 0;

// posities van de dingen in de game
var spelerX = 200; // x-positie van speler
var spelerY = 200; // y-positie van speler

var vijandX = 1280; // x-positie van vijand
var vijandY = 300; // y-positie van vijand

var steenX = 1280; // x-positie van steen
var steenY = 500; // y-positie van steen

var kogelX = -10; // x-positie van kogel
var kogelY = -10; // y-postitie van kogel
var kogelVliegt = false; 

// zat al in de game 
var img;
let bg;
let y = 0;

var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 6;


// Images een naam geven zodat ze bruikbaar zijn
var Backgroundforest;
var Backgroundforest2;
var Playerpicture;
var Enemypicture;
var Steenpicture;
var Tntpicture;
var gameoverpicture;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// loading van de foto's
function preload() {
  Backgroundforest = loadImage('pictures/forest.gif');
  Backgroundforest2 = loadImage('pictures/forest1.png');
  Playerpicture = loadImage('pictures/player.gif');
  Enemypicture = loadImage('pictures/wolf.gif');
  Steenpicture = loadImage('pictures/steen.png');
  Tntpicture = loadImage('pictures/TNTtje.webp');
  gameoverpicture = loadImage('pictures/game-over-game.gif');
}

// zorgen dat alles in de game op de goede manier beweegt
var beweegAlles = function() {
  // speler
  if (keyIsDown(87)) { // [w] key
    spelerY = spelerY - 3;
  }
  if (keyIsDown(83)) { // [s] key
    spelerY = spelerY + 3;
  }
  // zorgen dat speler niet van het scherm af kan gaan
  if (spelerY < 120) {
    spelerY = 120;
  }
  if (spelerY > 640) {
    spelerY = 640;
  }
  
  // vijand laten bewegen vanaf rechts naar links op een random y positie
  vijandX = vijandX - 15;
  if (vijandX < 0) {
    vijandX = 1280;
    vijandY = random(120, 640);
    score = score + 1;
  }

  if (score > 90){
    vijandX = vijandX - 15,5;
  }

  // steen laten bewegen vanaf rechts naar links op een random y positie
  steenX = steenX - 7;
  if (steenX < 0) {
    steenX = 1280;
    steenY = random(120, 640);
    score = score + 1;
  }

  // kogel laten vliegen
  if (kogelVliegt === false && 
      keyIsDown(32)){ //space
    kogelVliegt = true; 
    kogelX = spelerX
    kogelY = spelerY
  }
  if (kogelVliegt === true ){
    kogelX = kogelX + 12;
  }
  if (kogelVliegt === true &&
     kogelX > 1240 ){
    kogelVliegt = false;
    kogelX = -10;
    kogelY = -10;
     }



};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand en game over
  if (spelerX - vijandX < 150 &&
    spelerX - vijandX > -150 &&
    spelerY - vijandY < 150 &&
    spelerY - vijandY > -140) {
    console.log("Botsing");
  }
  // botsing speler tegen steen en de score 0 maken
  if (spelerX - steenX < 100 &&
    spelerX - steenX > -100 &&
    spelerY - steenY < 100 &&
    spelerY - steenY > -100) {
    score = 0;
  }

  // botsing kogel tegen vijand en vijand weer naar de rechter kant brengen, ook krijg je +2 score
if (kogelX - vijandX < 100 &&
   kogelX - vijandX > -100 &&
   kogelY - vijandY < 100 &&
   kogelY - vijandY > -100){
  vijandX = 1240;
  vijandY = random(20, 640);
  kogelVliegt = false;
  kogelX = -10
  kogelY = -10
  score = score + 2;
   }


};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  
  
  // vijand
  image(Enemypicture, vijandX - 40, vijandY - 40, 150, 150);

  // steen
  image(Steenpicture, steenX - 30, steenY - 30, 100, 100);

  // speler
  image(Playerpicture, spelerX - 40, spelerY - 40, 150, 150);

  //kogel
  image(Tntpicture, kogelX - 30, kogelY - 30, 50, 50);

  // punten en health
  fill("red");
  rect(20, 20, 200, 50, 30);
  textSize(30);
  textFont("Bangers");
  fill("White");
  text("SCORE: " + score, 40, 60);

};




/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of er een botsing is 
  if (spelerX - vijandX < 120 &&
    spelerX - vijandX > -120 &&
    spelerY - vijandY < 120 &&
    spelerY - vijandY > -120) {
    console.log("Botsing");
    return true;
  }
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */



/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
x2 = width;
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("blue")
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  bg = loadImage('bos2.webp');
  createCanvas(1280, 720);
}

/**
 * drawwsw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // Uitleg scherm
if (spelStatus === UITLEG){
  console.log("uitleg")
  image(Backgroundforest, 0, 0 , 1280, 750);

  fill("red");
  rect(26, 50, 244, 60, 20);
  textSize(50);
  fill("white");
  textFont("Bangers");
  text("EXPLANATION: - 'W' to go up ", 40, 100);
  text("- 'S' to go down", 270, 150);
  text("- 'Space' to shoot (only works on wolves)", 270, 200);
  textSize(90);
  text("Click 'Enter' to play!!", 300, 400);
  fill("red");
  text("'Enter'", 480, 400);
  textSize(30);
  fill("white");
  text("watch out for the wolves ;)", 480, 450);
  
   if (keyIsDown(13)) { //enter
      spelStatus = SPELEN;
      vijandX = 1280
      vijandY = random(120, 640)
      steenX = 1280
      steenY = random(120, 640)
      spelerY = random(120, 640);
      kogelX = -10;
      kogelY = -10;
      score = 0;
    }
}

  // speel scherm
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    // achtergrond laten bewegen
     image(Backgroundforest2, x1, 0, width, height);
  image(Backgroundforest2, x2, 0, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
      background(bg);

      stroke(226, 204, 0);
      line(0, y, width, y);

      y++;
      if (y > height) {
        y = 0;
      }
    }
    console.log("spelen")

  }

  // gameover scherm
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game-over")
    
    image(Backgroundforest, 0, 0, 1280, 750);//background

    image(gameoverpicture, 440, 80, 400, 400);

    textSize(50);
    textFont("Bangers");
    fill("white");
    text("Click", 400, 580);
    text("to try again!!", 630, 580);
    fill("red");
    text("'enter'", 500, 580);

    fill("red");
    rect(26, 645, 160, 50, 20);
    
    textSize(35);
    fill("white");
    text("SCORE: " + score, 30, 60);
    text("HIGHSCORE: " + highscore, 30, 100);
    text("EXPLANATION: use 'W' to go up / 'S' to go down / 'Space' to shoot.", 30, 685);

    fill("red")
    

    function Spelen() {
  spelStatus = SPELEN;
      vijandX = 1280
      vijandY = random(120, 640)
      steenX = 1280
      steenY = random(120, 640)
      spelerY = random(120, 640);
      kogelX = -10;
      kogelY = -10;
      score = 0;
    }

    if (score > highscore) {
      highscore = score;
    }

    if (keyIsDown(13)) { //enter
      spelStatus = SPELEN;
      vijandX = 1280
      vijandY = random(120, 640)
      steenX = 1280
      steenY = random(120, 640)
      spelerY = random(120, 640);
      kogelX = -10;
      kogelY = -10;
      score = 0;
    }
  }
  

}


