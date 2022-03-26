/*
C-35 SYNCHRONOUS ball Movement

Developer:

Topics: REALTIME DATABASE, CRUD- CREATE READ UPDATE DELETE

Goals:
● Create a remote real time database.
● Read and write data to a real time database.
● Create a ball which moves synchronously in different browsers.
*/

//Declare variables for game objects and behaviour indicators(FLAGS)
var ball;
var databaseOBJ;
var posnfromDB;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {}

//define the initial environment of the software(before it is used)
//by defining the declared variables with default values
function setup() {
    createCanvas(500, 500);

    //initialize the database
    databaseOBJ = firebase.database();

    ball = createSprite(250, 250, 10, 10);
    ball.shapeColor = "red";

    var ballPositionRef = databaseOBJ.ref("ball/position");
    ballPositionRef.on("value", readPosition, showError);
}

//All modifications, changes, conditions, manipulations, actionscommands to be executed and checked, continuously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
    background("white");
    if (keyDown(LEFT_ARROW)) {
        //changePosition(-1,0);
        writePosition(-1, 0);
    } else if (keyDown(RIGHT_ARROW)) {
        //  changePosition(1,0);
        writePosition(1, 0);
    } else if (keyDown(UP_ARROW)) {
        //changePosition(0,-1);
        writePosition(0, -1);
    } else if (keyDown(DOWN_ARROW)) {
        //changePosition(0,+1);
        writePosition(0, 1);
    }
    drawSprites();
}

function changePosition(x, y) {
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

/*
Everytime a change in the database values
of position (reference) happens, the
readPosition function is called.

In the readPosition function we can read
the position of the value in the database.

We assign the x and y values of the ball
position in the database to the ball sprite
*/
function readPosition(data) {
    posnfromDB = data.val();
    ball.x = posnfromDB.x;
    ball.y = posnfromDB.y;
}

/*
If there is any error in reading the values in
the database, the showError function is
called.
*/
function showError() {
    console.log("error while accesing database");
}

/*
function definition to write the change in
position field when arrow keys are pressed.

function definition to update the values of x and y 
according to the arrow pressed from old to new in the database
*/
function writePosition(xInput, yInput) {
    databaseOBJ.ref("ball/position").set({
        x: posnfromDB.x + xInput,
        y: posnfromDB.y + yInput
    });
}

/* READ READ READ READ

CRUD - CREATING READING UPDATING DELETING

.ref() is used to refer to the location of the
database value(field) we care about.

.on() creates a listener which keeps
listening to the changes in the database.

.set() is used to set the value in the
database



READ READ READ READ */