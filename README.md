# wb-tic-tac-poker
There are 2 parts to this assignment. In Part 1, you will create a Tic Tac Toe board using HTML, CSS and Javascript. In Part 2 you will create a poker hand. Detailed instructions are included in the folders for each part.
Lab: Tic Tac Toe and Poker#
There are 2 parts to this assignment. In Part 1, you will create a Tic Tac Toe board using HTML, CSS and Javascript. In Part 2 you will create a poker hand. Detailed instructions are included in the folders for each part.

Setup#
Use dmget to download the starter code.

dmget wb-tic-tac-poker
Navigate to the project directory and open it in VS Code.

cd ~/wb-tic-tac-pokercode .
Initialize a Git repo and make your initial commit.

Part 1#
In this project, we will practice vanilla Javascript DOM manipulation by creating a Tic Tac Toe game.

Create index.js#
In this step, you’ll create a JavaScript file and connect it to Part1/index.html.

Before you do this, review the HTML in Part1/index.html and familiarize yourself with the contents of the page.

Create a file in the Part1 directory called index.js.

Add a <script> tag at the bottom of the <body> tag and connect the index.js file we just created.

Call console.log in index.js and output a message to test the connection from your script file.

Create event handlers for the squares#
In this step, we will create event handler to listen for when any of the 9 boxes are clicked.

In index.js, create a function called play. We will be invoking this function any time one of 9 boxes are clicked. For now, the function should only contain a basic console.log with a message such as “Square was clicked”.

Underneath the play function, use document.querySelectorAll to select all the squares (notice that they all have the same CSS class). Store the resulting node list in a variable called squares.

Loop through the squares node list using a for...of loop. Inside the loop, add a ‘click’ event listener for each item in the node list. The callback for each event listener should be the play function.

Now try clicking on the squares. You should see the message print out in the console.

Solution

function play() {
  console.log("Square was clicked");
}

const squares = document.querySelectorAll('.square');

for (const square of squares) {
  square.addEventListener('click', play)
}
Allow players to take turns#
In this step, we will reassign value of the player from 'X' to 'O' when the board is clicked. This will occur after a player has clicked the board to take their turn and it is then the next player’s turn.

Above the play function in Part1/index.js, create a global variable called player which starts off with the value 'X' (since X always goes first). This will need to be a let variable.

Inside the play function, remove the console log. Every time this function runs we will want to toggle the 'X' to a 'O' or vice versa to signify the next player’s turn. Toggle the value of player to the opposite value.

Then, select the <span> with the ID of current-player and store that in a variable. (This <span> is the text on the bottom left of the screen that shows whose turn it is). Set the text inside this <span> to the value of player.

At the conclusion of this step you should see that when the board is clicked, the text on the bottom left of the board should alternate between “Player X’s turn” and “Player O’s turn”.

Solution

let player = 'X';

function play() {

  // Switch turns (ex.: if it was X's turn, it should be O's turn next)
  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }

  const playerSpan = document.querySelector('#current-player');
  playerSpan.innerText = player;
}
Alternatively, you can replace the if...else statement with a ternary:

player = player === 'X' ? 'O' : 'X';
Render Xs and Os#
In this step, you’ll continue adding code to the play function in Part1/index.js so it puts either an X or an O as the content of the square that’s clicked. In order to find out which square has been clicked, we can use Event.target.

Add a parameter to play called evt. This is an optional parameter which will contain information about the event — including the evt.target, or the HTML element that was clicked.

Now, all you need to do is set the innerText of the evt.target to have the value of player ('X' or 'O').

Solution

function play(evt) {
  const targetSquare = evt.target;
  targetSquare.innerText = player;

  // Switch turns (ex.: if it was X's turn, it should be O's turn next)
  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }

  const playerSpan = document.querySelector('#current-player');
  playerSpan.innerText = player;
}
Determine if there’s a winner#
Now we need to determine if there’s a winner. We can use the squares array (technically a NodeList) that we got from calling document.querySelectorAll earlier. If you console log squares, it will be a list of nine HTML elements, in the order that they appear in the HTML. So the top-left square will be index 0, the top-right square will be index 2, the middle square will be index 4, etc.

We know there’s a winner if three squares that are in a line contain the same non-blank innerText (i.e. the innerText of all three is either 'X' or 'O'). One way to do this is to write a helper function that checks all horizontal, vertical, and diagonal lines and returns the winner (or null/undefined if there’s no winner yet).

Think through and outline the steps that are needed to determine if there’s a winner. For your convenience, here are the indices in the squares array that make lines:

const lines = [
  // Horizontal lines
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical lines
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal lines
  [0, 4, 8],
  [2, 4, 6],
];
A function to calculate the winner

There are many ways to implement calculating the winner. This is just one way.

If a winner exists, the function will return either 'X' or 'O'. If a winner doesn’t exist, it’ll return undefined.

function calculateWinner() {
  const lines = [
    // Horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal lines
    [0, 4, 8],
    [2, 4, 6],
  ];

  // We want to use a traditional for-loop instead of a .forEach() loop so we can return
  // as soon as a winner is found.
  for (const line of lines) {
    const [a, b, c] = line;
    // Get the text in each square
    const squareAText = squares[a].innerText;
    const squareBText = squares[b].innerText;
    const squareCText = squares[c].innerText;

    // If the first square isn't blank, and it matches the value of the second and third square,
    // then we have a winner.
    if (squareAText !== '' && squareAText === squareBText && squareAText === squareCText) {
      return squareAText;
    }
  }

  // If we've searched all the lines, then the function returns undefined.
  return undefined;
}
Alert if there’s a winner or a tie game#
If there’s a winner, we want to display the winning player using an alert.

If there’s no winner and all squares are filled, we want to alert that the game is a tie (also known as a cat’s game).

Probably the easiest way to do this is to loop through squares and check if any of the squares has a blank innerText. As soon as you find one that is blank, you know the board isn’t full yet.

Solution

function play(evt) {
  const targetSquare = evt.target;
  targetSquare.innerText = player;

  // Switch turns (ex.: if it was X's turn, it should be O's turn next)
  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }

  const playerSpan = document.querySelector('#current-player');
  playerSpan.innerText = player;

  const winner = calculateWinner();
  if (winner) {
    alert(`${winner} is the winner!`);
  } else if (isBoardFull()) {
    alert('Game is a tie!');
  }
}
function isBoardFull() {
  for (const square of squares) {
    if (square.innerText === '') {
      return false;
    }
  }
  return true;
}
Part 2#
In this project we will continue practicing vanilla Javascript DOM manipulation by creating an editable poker hand. We will be able to edit the styling (color) of each card to match the color it should be.

Create index.js#
In this step, you’ll create a JavaScript file and connect it to Part2/index.html.

Before you do this, review the HTML in Part2/index.html and familiarize yourself with the contents of the page.

Create a file in the Part2 directory called index.js.

Add a <script> tag at the bottom of the <body> tag and connect the index.js file we just created.

Call console.log in index.js and output a message to test the connection from your script file.

Add input fields#
In this step, we will create input fields that can be used to pass information to Part2/index.js.

Open Part2/index.html.

Create 2 input fields under the main tag. The first input will be used to grab the ID of each card, the second will be used to assign a style attribute to the card. Assign a specific ID to each input.

Also add a button beneath the input fields containing the text “Edit Card”. Give it an ID.

Open Part2/index.js.

Using document.querySelector, grab each input field and store it in a variable. Then console.log the variables.

Solution

Part2/index.html#
<body>
  <header>Poker Cards</header>
  <main>
    <section><span>A</span><span>♦</span><span>A</span></section>
    <section><span>A</span><span>♣</span><span>A</span></section>
    <section><span>A</span><span>♥</span><span>A</span></section>
    <section><span>A</span><span>♠</span><span>A</span></section>
  </main>

  <input id="idInput" type="text" placeholder="Set ID">
  <input id="colorInput" type="text" placeholder="Set Color">
  <button id="editCardButton">Edit Card</button>

  <script src="./index.js"></script>
</body>
Part2/index.js#
const idInput = document.querySelector('#idInput');
const colorInput = document.querySelector('#colorInput');

console.log(idInput);
console.log(colorInput);
Target cards#
In this step, we will target each card using the input fields that we created.

In index.html, assign a specific ID to each section tag. These are the 4 cards in our hand. Have each ID match the corresponding playing card suit (diamonds, clubs, hearts, and spades).

Open index.js.

Create a function called setCard. Inside the function, select the card element based off of the value typed into the first input field (which will be the ID of the card element). This will be done using a combination of document.querySelector and the value property from the first input field. Store the element in a variable and console.log it.

Below the setCard function, use document.querySelector to select the “Edit Card” button, using the ID you gave it in the previous step. Then add an ‘click’ event listener to the button which has setCard as its callback.

Now, type in a card suit into the first input and click the button. You should see a console.log of the correct element.

Solution

Part2/index.html#
<section id="diamonds"><span>A</span><span>♦</span><span>A</span></section>
<section id="clubs"><span>A</span><span>♣</span><span>A</span></section>
<section id="hearts"><span>A</span><span>♥</span><span>A</span></section>
<section id="spades"><span>A</span><span>♠</span><span>A</span></section>
Part2/index.js#
const idInput = document.querySelector('#idInput');
const colorInput = document.querySelector('#colorInput');

function setCard() {
  const card = document.querySelector(`#${idInput.value}`);
  console.log(card);
}

document.querySelector("#editCardButton").addEventListener('click', setCard);
Apply colors to the cards#
In this step, we will give each card its correct color.

Open index.js. In the setCard function, you’ve already selected the appropriate card based on the suit that was typed into the first input. Now, using the value from the second input field, add the color style to the selected card element.

Assign the appropriate color to each card (Diamonds/Hearts = red, Clubs/Spades = black).

Solution

Part2/index.js#
const idInput = document.querySelector('#idInput');
const colorInput = document.querySelector('#colorInput');

function setCard() {
  const card = document.querySelector(`#${idInput.value}`);
  card.style.color = colorInput.value;
}

document.querySelector('#editCardButton').addEventListener('click', setCard);
