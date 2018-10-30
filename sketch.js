var myData;
var people = [];
var img;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  img = loadImage("assets/rocket.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //print(myData);
  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    print(astroData);
    var newAstronaut = new Astronaut(astroData.launchdate, astroData.name, astroData.title, astroData.country);
    people.push(newAstronaut);
  }


}

function draw() {

  background(0);

  textFont("Helvetica");
  fill('blue');
  textSize(24);
  textAlign(CENTER)
  text("PRESS THE MOUSE TO KNOW WHO IS IN SPACE", windowWidth/2, windowHeight/2);

  for (var i = 0; i < people.length; i++) {
    var astronaut = people[i];
    astronaut.move();
    astronaut.display();
  }

}

function Astronaut(launchDate, name, title, country) {

  this.name = name;
  this.title = title;
  this.country = country;

  // transform the launch date from String
  // to a date Object calculated in milliseconds
  this.launchDate = Date.parse(launchDate);
  // calculate the time spent in space
  var timeInSpace = Date.now() - this.launchDate;
  // define radius according to the time spent in space
  this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;

  this.x = random(50, width - 100);
  this.y = random(50, height - 100);

  this.incrementX = 2;
  this.incrementY = 4;

  this.display = function() {

    image(img, this.x - 50, this.y - 50);

    textAlign(CENTER);

    if (mouseIsPressed) {
      fill('blue');
      textSize(16);
      text(this.name, this.x, this.y);

    }

  }

  this.move = function() {

    this.x += this.incrementX;
    this.y += this.incrementY;

    if (this.x > width || this.x < 30) {
      this.incrementX *= -1
      print(this.x);
      print(this.radius);
    }

    if (this.y > height - 30 || this.y < 40) {
      this.incrementY *= -1
      print(this.y);
      print(this.radius);
    }
  }
}
