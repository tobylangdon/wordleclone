const keyCont = document.getElementById("keyboard");
const wordCont = document.getElementById("wordContainer");
const boxes = document.getElementsByClassName("box");
currentRow = 0;

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
const secretWord =
    wordList[Math.floor(Math.random() * wordList.length - 1) + 1];

let grid = {
    0: ["", "", "", "", ""],
    1: ["", "", "", "", ""],
    2: ["", "", "", "", ""],
    3: ["", "", "", "", ""],
    4: ["", "", "", "", ""],
    5: ["", "", "", "", ""],
};

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

function revealLetter(id, classToAdd, key) {
    console.log("revelaing");
    const square = document.getElementById(id);
    const keyLetter = document.getElementById(key);
    keyLetter.classList.add(classToAdd);
    square.classList.add(classToAdd);
}

function checkRow() {
    if (grid[currentRow].join("").length != 5) {
        console.log("Every letter");
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
keys.forEach((key) => {
    const butEl = document.createElement("button");

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
