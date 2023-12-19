const turns = ["o","x"]

let currentTurn = 0

const placed = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

let rects = document.querySelectorAll("rect")
// todo matrix befüllen dann fertig
const rows = [0, 1, 2, 0, 1, 2, 0, 1, 2];
const cols = [0, 0, 0, 1, 1, 1, 2, 2, 2];

for (let i = 0; i < 9; i++) {
    rects[i].row = rows[i];
    rects[i].col = cols[i];
}


function rectClicked(button) {
    const svg = document.querySelector("svg")
    if (currentTurn ===  0) {
        svg.appendChild(getO(button.getAttribute("x"), button.getAttribute("y")))
    } else {
        svg.appendChild(getX1(button.getAttribute("x"), button.getAttribute("y")))
        svg.appendChild(getX2(button.getAttribute("x"), button.getAttribute("y")))
    }


    button.removeAttribute("onclick");
    console.log(currentTurn)
    placed[button.col][button.row] = currentTurn
    const winner = checkTicTacToeWinner(placed)
    if(winner != null) {
        announceWinner(winner)
    }
    currentTurn = (currentTurn + 1) % turns.length


}

function getO(x, y) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", (parseInt(x)+50))
    circle.setAttribute("cy", (parseInt(y)+50))
    circle.setAttribute("r", "50")
    return circle
}


function getX1(x,y) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x)
    line.setAttribute("x2", (parseInt(x)+100).toString())
    line.setAttribute("y1", y)
    line.setAttribute("y2", (parseInt(y)+100).toString())
    line.setAttribute("stroke", "black")
    return line

}
function getX2(x,y) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x)
    line.setAttribute("x2", (parseInt(x)+100).toString())
    line.setAttribute("y1", (parseInt(y)+100).toString())
    line.setAttribute("y2", (parseInt(y)).toString())
    line.setAttribute("stroke", "black")
    return line

}

function checkTicTacToeWinner(matrix) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (
            matrix[i][0] === matrix[i][1] &&
            matrix[i][1] === matrix[i][2] &&
            matrix[i][0] !== null
        ) {
            return matrix[i][0]; // Winner found in row
        }

        if (
            matrix[0][i] === matrix[1][i] &&
            matrix[1][i] === matrix[2][i] &&
            matrix[0][i] !== null
        ) {
            return matrix[0][i]; // Winner found in column
        }
    }

    // Check diagonals
    if (
        matrix[0][0] === matrix[1][1] &&
        matrix[1][1] === matrix[2][2] &&
        matrix[0][0] !== null
    ) {
        return matrix[0][0]; // Winner found in main diagonal
    }

    if (
        matrix[0][2] === matrix[1][1] &&
        matrix[1][1] === matrix[2][0] &&
        matrix[0][2] !== null
    ) {
        return matrix[0][2]; // Winner found in anti-diagonal
    }

    return null; // No winner
}

function announceWinner(winner) {
    rects.forEach(r => {
        r.removeAttribute("onclick");
    })
    const winSign = winner === 0 ? "Kreis" : "X"
    const winTitle = `Der Sieger ist ${winSign}`
    document.body.innerHTML += `
        <h1>${winTitle}</h1>
    `
}