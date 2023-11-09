let player='x';

function play() {
const targetSquare = evt.target;
targetSquare.innerText = player;
if (player==='X') {
    player='O';
}else{
    player='X';
}
}

const squares=document.querySelectorAll ('.square');

for (const square of squares){
    square.addEventListener('click', play);
}

const playerSpan = document.querySelector('#current-player')
    playerSpan.innerText = player;

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
      ]

function winnerRules () {
for(line of lines){
   const [a,b,c] = line;
   let innerTextA = squares[a].innerText;
   let innerTextB = squares[b].innerText;
   let innerTextC = squares[c].innerText;
if(innerTextA && innerTextA===innerTextB && innerTextB===innerTextC){
return alert('winner!');
}
}
}

function gamerOver(){
    for (square of squares){
        if (square.innerText === '')
        return false;
    }
    return true;
}

