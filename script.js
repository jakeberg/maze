const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];

const main = document.querySelector("main");
// Draws the board based on the array above
function draw(startPos) {

    for (let i = 0; i < startPos.length; i++) {
        var newRow = document.createElement("div");
        newRow.className = ("flexbox");
        main.appendChild(newRow);

        for (let j = 0; j < startPos[i].length; j++) {
            let cell = startPos[i][j];

            if (cell === "W") {
                var newCol = document.createElement("div");
                newCol.className = ("wall");
                newRow.appendChild(newCol);
            } else if (cell === " ") {
                var newCol = document.createElement("div");
                newCol.className = ("empty");
                newRow.appendChild(newCol);
            } else if (cell === "S") {
                var newCol = document.createElement("div");
                newCol.id = ("start");
                let start = document.getElementById("start");
                newRow.appendChild(newCol);
            } else if (cell === "F") {
                var newCol = document.createElement("div");
                newCol.className = ("finish");
                newRow.appendChild(newCol);
            }
        }
    }
}

// The way key events work : 
// 1. Clear the board.
// 2. Loop through the array and descide if there is a row with an "S"
// 3. Take that row and split it, remove the "S", then move the "S" into the correct row
// 4. The new row is placed back into the array and inserted back into the map
// 5. The map is now run through the draw() function to get the new position of the "S"

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName == "ArrowRight") {
        reset(main);
        for (let i = 0; i < map.length; i++) {
            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let playerPos = map[i].indexOf("S");
                if (map[i][playerPos + 1] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos + 1), 0, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                } else if(map[i][playerPos+1] == "F"){
                    alert("you win");
                    location.reload();
                } else {
                    var newMap = map;
                }
            }
        }
        draw(newMap);
    }

    if (keyName == "ArrowLeft") {
        reset(main);
        for (let i = 0; i < map.length; i++) {
            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let playerPos = map[i].indexOf("S");
                if (map[i][playerPos - 1] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos - 1), 0, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                } else {
                    var newMap = map;
                }
            }
        }
        draw(newMap);
    }
    if (keyName == "ArrowUp") {
        reset(main);
        for (let i = 0; i < map.length; i++) {
            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let rowAbove = map[i-1].split('');
                let playerPos = map[i].indexOf("S");

                if (map[i-1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, "S");

                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2 = rowAbove.join('');
                    map[i-1] = rejoined2;

                    var newMap = map;
                } else {
                    var newMap = map;
                }
            }
        }
        draw(newMap);
    }

    if (keyName == "ArrowDown") {
        reset(main);
        outer:
        for (let i = 0; i < map.length; i++) {
            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let rowBelow = map[i+1].split('');
                let playerPos = map[i].indexOf("S");

                if (map[i+1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, "S");

                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2 = rowBelow.join('');
                    map[i+1] = rejoined2;

                    var newMap = map;
    
                } else {
                    var newMap = map;
                } break outer;
            }
        }
        draw(newMap);
    }
});

function reset(destination) {
    while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
    }
}

draw(map);
