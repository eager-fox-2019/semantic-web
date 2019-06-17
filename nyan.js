var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// load img
var nyan = new Image()
var nyanBig = new Image()
var nyanEnd = new Image()
var bg = new Image()
var fg = new Image()
var debrisNorth = new Image()
var debrisSouth = new Image()
var textbox = new Image()

nyan.src = 'images/nyanSmall.png'
nyanBig.src = 'images/nyanBig.png'
nyanEnd.src = 'images/nyanEnd.png'
bg.src = 'images/bgSpace.png'
fg.src = 'images/fgSpace2.png'
debrisNorth.src = 'images/debrisNorth.png'
debrisSouth.src = 'images/debrisSouth.png'
textbox.src = 'images/textbox.png'

// load sound
var intro = new Audio()
var bgSound = new Audio()
var scr = new Audio()
var crash = new Audio()

intro.src = 'sounds/intro.mp3'
bgSound.src = 'sounds/loop.mp3'
scr.src = 'sounds/meow.mp3'
crash.src = 'sounds/slap.mp3'

// nyan default position
var nX = 10
var nY = 300

// set default score
var score = 0

var main = true
var play = false
var end = false

// array for debris position
var debris = []
debris[0] = {
  x : canvas.width,
  y : 0
}

// main menu
function mainMenu() {
  if (main === true) {
    intro.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    intro.play()
  }
  
  context.drawImage(bg, 0,0)

  // display foreground
  context.drawImage(fg, 0, canvas.height - fg.height)

  // display nyan
  context.drawImage(nyanBig, 180, 200)

  context.fillStyle = '#D9C277'
  context.font = '30px Verdana'
  context.fillText('Press Enter to Start', 100, canvas.height - 50)

  requestAnimationFrame(mainMenu)
}

// entering main menu
mainMenu()

// end menu
function endMenu() {
  main = false
  play = false
  end = true
  intro.pause()
  bgSound.pause()
  context.drawImage(bg, 0,0)
  context.drawImage(fg, 0, canvas.height - fg.height)
  context.drawImage(nyanEnd, 180, canvas.height - 330)

  context.fillStyle = 'white'
  context.font = '30px Verdana'
  context.fillText('Nyan had crashed :(', 100, canvas.height - 470)
  context.fillText('Debris avoided : ' + score, 110, canvas.height - 420)
  if (score <= 10) {
    context.fillText('Totally NOOB!', 150, canvas.height - 200)
  }
  
  if (score > 10 && score <= 30) {
    context.fillText('Not Bad, meow!', 130, canvas.height - 200)
  }

  if (score > 30 && score <= 50) {
    context.fillText('AWESOME, MEOW!', 110, canvas.height - 200)
  }

  if (score > 50) {
    context.fillText('NEKO NO KAMI-SAMA!', 90, canvas.height - 200)
  }

  context.fillText('Press Space to', 135, canvas.height - 70)
  context.fillText('Back to Main Menu', 105, canvas.height - 30)

  requestAnimationFrame(endMenu)
}

// check pressed keyboard button
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (main === true && e.keyCode == '13') {
    // enter
    draw()
  }
  if (end === true && e.keyCode == '32') {
    // space
      location.reload()
  }
  if (nY >= 10 && play === true && e.keyCode == '38') {
    // up arrow
    moveUp()
  }
  else if (play === true && e.keyCode == '40') {
    // down arrow
    moveDown()
  }
  else if (nX >= 10 && play === true && e.keyCode == '37') {
    // left arrow
    moveLeft()
  }
  else if (nX <= 420 && play === true && e.keyCode == '39') {
    // right arrow
    moveRight()
  }
}


// adding move function
function moveUp() {
  nY -= 25
}
function moveDown() {
  nY += 25
}
function moveLeft() {
  nX -= 20
}
function moveRight() {
  nX += 20
}

// main function
function draw() {
  main = false
  play = true
  intro.pause()
  if (play === true) {
    bgSound.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    bgSound.play()
  }

  var gap = 100
  var constant = debrisNorth.height + gap
  
  var distance = 200
  if (score > 10 && score <= 30) {
    distance = 180
  }
  if (score > 30 && score <= 50) {
    distance = 160
  }
  if (score > 50) {
    distance = 140
  }
  
  context.drawImage(bg, 0,0)

  for (var i = 0;  i < debris.length; i++) {
    context.drawImage(debrisNorth, debris[i].x, debris[i].y)
    context.drawImage(debrisSouth, debris[i].x, debris[i].y + constant)
    debris[i].x--
    
    // display new set of debris
    if (debris[i].x == canvas.width - distance) {
      debris.push({
        x : canvas.width,
        y : Math.floor(Math.random()*debrisNorth.height) - debrisNorth.height
    })
    }

    // detect collision
    if (nX + nyan.width >= debris[i].x && nX <= debris[i].x + debrisNorth.width
      && (nY <= debris[i].y + debrisNorth.height || nY+nyan.height >= debris[i].y + constant)
      || nY + nyan.height >= canvas.height - fg.height) {
      bgSound.pause()
      crash.play()
      return endMenu()
    }

    // set score
    if (debris[i].x == nX) {
      score++
      scr.play()
    }
  }

  // display foreground
  context.drawImage(fg, 0, canvas.height - fg.height)

  // display nyan
  context.drawImage(nyan, nX, nY)

  // display score
  context.fillStyle = '#D9C277'
  context.font = '20px Verdana'
  if (score <=10) {
    context.fillText('Level: Easy', 160, canvas.height - 40)
  }
  if (score > 10 && score <= 30) {
    context.fillText('Level: Medium', 160, canvas.height - 40)
  }
  if (score > 30 && score <= 50) {
    context.fillText('Level: Hard', 160, canvas.height - 40)    
  }
  if (score > 50) {
    context.fillText('Level: Expert', 160, canvas.height - 40)
  }
  context.fillText('Debris avoided : ' + score, 160, canvas.height - 20)

  requestAnimationFrame(draw)
}
