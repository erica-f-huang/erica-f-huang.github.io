// HTML = the structure of your page
// JavaScript = code that can read/change that structure
// document class = JavaScript’s handle to the page

//tutorial: https://www.thatsoftwaredude.com/content/6193/coding-the-snake-game-in-javascript

//NOTE: turn theblock into thesnake by making it an array of values, kind of like a shift register
// when snake moves, head position becomes 2nd lock position, etc
    // last block turns back to nroaml grid
// when snake eats apple, shift everything but dont turn last block to nroaml grid so it adds a block
    //involves updating length of array too


var size = 10;                      //size of grid
var timer;                          //interval for how fast the snake will move
var direction = "up";               //snake's current direction
var theblock;                       //main character, has x and y members
var background_color = "green"
var snake_color = "blue"

//need to create a table element in HTML called "grid". This function will
//generate the cells needed
function drawGrid()
{
	for(var i = 0; i < size; i++)
	{
        //tr = table row
        //this creates a new <tr> element in the page
		var row = document.createElement("tr");

		for(var x = 0; x < size; x++)
		{
            //td = table data cell
            //this creates a new <td> element in the page
			var cell = document.createElement("td");
            cell.style.backgroundColor = background_color;

            //put the cell inside the row <tr>. cell is now child of row
			row.appendChild(cell);
		}

        //get element whose id is "grid"
        //row is a child of grid. String rows together for a full grid
		document.getElementById("grid").appendChild(row);
	}
}

//when the page loads, create the grid and the snake
function load()
{
    //draw the grid (doesn't put anything in it yet)
    drawGrid();

    //set starting position for theblock
    theblock = {x: Math.floor(size / 2), y: Math.floor(size / 2)};

    //draw theblock on the grid
    drawBlock();
}

function drawBlock()
{
    //get the grid and store it in variable
    var grid = document.getElementById("grid");

    grid.rows[theblock.y].        //get the row of the snake (theblock)
            cells[theblock.x].      //get the col of the snake (theblock)
            style.backgroundColor = snake_color; //color it green
}


/*************************** STEP 2 *************************/


//move based on direction until you hit an edge
function move()
{
    // Clear current block
    var grid = document.getElementById("grid");
    grid.rows[theblock.y].cells[theblock.x].style.backgroundColor = background_color;

    // determins the new x and y values based on moving direction
    switch(direction)
    {
        case "up":
        theblock.y--;
        break;

        case "down":
        theblock.y++;
        break;

        case "left":
        theblock.x--;
        break;

        case "right":
        theblock.x++;
        break;
    }

    // edge detection. game ends if this happens
    if (theblock.x < 0 || theblock.y < 0 || theblock.x >= size || theblock.y >= size)
    {
        document.getElementById("message").innerHTML = "Lost";

        //stop calling the interval
        clearInterval(timer);
    }
        else {
        //if drawing a block stays in border, draw it
        drawBlock();
    }
}


/*************************** STEP 3 *************************/

function start()
{
    /*
    - event handler that says call checkKey should happen when a key is pressed
    - again, not checkKey() becuase that it call it and assign it to the 
        onekeydown, it's not a dynamic thing
    - onkeydown records an event, and passes it into checkKey (arg e)
    */
    document.onkeydown = checkKey;
    
    //calls move() every 500ms
    timer = setInterval(function(){move();}, 500);
}

//e is the onkeydown event that was recorded in start()
function checkKey(e) {
    e = e || window.event;

    
    e.preventDefault(); // stops page scrolling
    

    if (e.keyCode == '38') {
        // up arrow
        direction = "up";
    }
    else if (e.keyCode == '40') {
        // down arrow
        direction = "down";
    }
    else if (e.keyCode == '37') {
       // left arrow
       direction = "left";
    }
    else if (e.keyCode == '39') {
       // right arrow
       direction = "right";
    }
}




//stores load function for when window finished loading
//if i did load() then it would run load and store in onload, but we want
//  the window the finish loading before running
window.onload = load;
