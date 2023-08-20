const keyCont = document.getElementById("keyboard");
const wordCont = document.getElementById("wordContainer");
const boxes = document.getElementsByClassName("box");
const PlayButton = document.getElementById('playBtn')
const winnerModal = document.getElementById('winner')
const container = document.getElementById('modal-container');
const playGameModal = document.getElementById('play-game');
const playAgainBtn = document.getElementById('playAgainBtn');
currentRow = 0;
let secretWord = ""
const wordList = [
    "apple",
    "table",
    "knife",
    "wrist",
    "peace",
    "lunch",
    "tried",
    "storm",
    "quiet",
    "dough",
    "merry",
    "music",
    "juice",
    "tiger",
    "early",
    "motel",
    "pound",
    "smile",
    "train",
    "ocean",
    "sunny",
    "flame",
    "chest",
    "scale",
    "plant",
    "stone",
    "lunar",
    "swift",
    "thorn",
    "hotel",
    "globe",
    "daisy",
    "piano",
    "crane",
    "lemon",
    "sugar",
    "dance",
    "wagon",
    "frost",
    "charm",
    "crown",
    "proud",
    "saint",
    "queen",
    "baker",
    "grace",
    "pasta",
    "spear",
    "dream",
    "wheat",
    "flock",
    "bloom",
    "spoon",
    "vivid",
    "hazel",
    "power",
    "quiet",
    "oasis",
    "treat",
    "bliss",
    // Add more words here...
];

grid = {
    0: ["", "", "", "", ""],
    1: ["", "", "", "", ""],
    2: ["", "", "", "", ""],
    3: ["", "", "", "", ""],
    4: ["", "", "", "", ""],
    5: ["", "", "", "", ""],
};

let correctLetters = []
let correctPlaceLetters =[]

let IdGrid = {};

const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "EMPTY",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "EMPTY",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<<",
];

PlayButton.addEventListener("click", gameInit);
playAgainBtn.addEventListener("click", gameInit);


function playGame(){
    container.style.display = "none";
}
function endGame(didWin){
    if(didWin){
        container.style.display ="flex"
        winnerModal.style.display = "flex"
    }
}

function revealLetter(id, classToAdd, key) {
    const square = document.getElementById(id);
    const keyLetter = document.getElementById(key);
    keyLetter.classList.add(classToAdd);
    square.classList.add(classToAdd);
}

function checkRow() {
    if (grid[currentRow].join("").length != 5) {

        return;
    }
    
    for (i = 0; i < grid[currentRow].length; i++) {
        // console.log(grid[currentRow][i], secretWord[i]);
        let id = `${currentRow}${i}`;
        if (grid[currentRow][i].toLowerCase() == secretWord[i].toLowerCase()) {
            console.log("Correct place");
            revealLetter(id, "correct", grid[currentRow][i]);
        } else if (
            secretWord.toLowerCase().includes(grid[currentRow][i].toLowerCase())
        ) {
            revealLetter(id, "includes", grid[currentRow][i]);
        } else {
            revealLetter(id, "notIncludes", grid[currentRow][i]);
        }
    }
    if(grid[currentRow].join("").toLowerCase() == secretWord.toLowerCase()){
        console.log("You Won!")
        endGame(true)
        return;
    }
    currentRow++;
}

function removeLetter() {
    for (i = 0; i < grid[currentRow].length; i++) {
        if (grid[currentRow][i] !== "") {
            if (grid[currentRow][i + 1] === "") {
                grid[currentRow][i] = "";
                break;
            } else if (grid[currentRow][grid[currentRow].length - 1] !== "") {
                grid[currentRow][grid[currentRow].length - 1] = "";
                break;
            }
        }
    }
    drawGrid();
    return;
}

function keyDown() {
    if (this.id != "ENTER" && this.id != "backspace") {
        for (i = 0; i < grid[currentRow].length; i++) {
            if (grid[currentRow][i] === "") {
                grid[currentRow][i] = this.id;
                drawGrid();
                return;
            }
        }
    } else if (this.id == "backspace") {
        removeLetter();
    } else if (this.id == "ENTER") {
        checkRow();
    }
}

function drawGrid() {
    for (i = 0; i < 6; i++) {
        for (x = 0; x < grid[i].length; x++) {
            const square = document.getElementById(`${i}${x}`);
            square.textContent = grid[i][x];
        }
    }
}

//Initiating grid
function gameInit(){
    currentRow = 0
    grid = {
        0: ["", "", "", "", ""],
        1: ["", "", "", "", ""],
        2: ["", "", "", "", ""],
        3: ["", "", "", "", ""],
        4: ["", "", "", "", ""],
        5: ["", "", "", "", ""],
    };

    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.classList.remove('correct')
        box.classList.remove('includes')
        box.classList.remove('notIncludes')
        box.textContent = ""
    });

    const keys = document.querySelectorAll('.key');

    keys.forEach(k => {
        k.classList.remove('correct')
        k.classList.remove('includes')
        k.classList.remove('notIncludes')
    });


    winnerModal.style.display = "none"
    playGameModal.style.display ="none"
    container.style.display = "none"

    secretWord =
    wordList[Math.floor(Math.random() * wordList.length - 1) + 1];

    console.log(secretWord)

    
    
   

}
keys.forEach((key) => {
    const butEl = document.createElement("button");
    butEl.setAttribute("class", "key");
    if (key != "<<") {
        butEl.setAttribute("id", key);
    } else {
        butEl.setAttribute("id", "backspace");
    }
    if (key != "EMPTY") {
        butEl.textContent = key;
        butEl.addEventListener("click", keyDown);
    }

    keyCont.append(butEl);
});

for (row in grid) {
    IdGrid[row] = [];
    let i = 0;
    for (box of grid[row]) {
        const boxEl = document.createElement("div");
        boxEl.textContent = box;

        boxEl.setAttribute("class", `box`);
        boxEl.setAttribute("id", `${row}${i}`);
        wordCont.append(boxEl);
        IdGrid[row].push(boxEl);
        i++;
    }
}

