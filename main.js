var gCounter = 1
var gSeconds = 0
var gMiliseconds = 00
var gInterval
var difficult = 25
var gNums

function onInit() {
    gCounter = 1
    var gSeconds = 0
    var gMiliseconds = 00
    gNums = createNums()
    gBoard = createBoard()
    renderBoard(gBoard)
}

function createBoard() {
    const board = []
    for (var i = 0; i < Math.sqrt(difficult); i++) {
        board.push([])
        for (var j = 0; j < Math.sqrt(difficult); j++) {
            board[i][j] = drawNum(shuffle(gNums))
        }
    }
    return board
}

function createNums() {
    var nums = []
    for(var i = 1 ; i <= difficult; i++) {
        nums.push(i)
    }
    return nums
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j]

            strHTML += `<td onClick="onClick(this, ${j})"> ${cell} </td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function onClick(elCellBtn, idx) {
    if (parseInt(elCellBtn.innerText) === gCounter) { // לתקן
        elCellBtn.style.backgroundColor = 'white'
        elCellBtn.style.color = 'gray'
        if(gCounter === difficult){
            clearInterval(gInterval)
            return
        }
        gCounter++
        displayClock()
    }
}
function displayClock() {
    clearInterval(gInterval)
    gInterval = setInterval(startTimer, 10)
}

function startTimer() { // לתקן
    const elSeconds = document.querySelector('.seconds')
    const elMiliSec = document.querySelector('.miliseconds')
    gMiliseconds++;

    if (gMiliseconds <= 9) {
        elMiliSec.innerHTML = "00" + gMiliseconds;
    }
    if (gMiliseconds > 9) {
        elMiliSec.innerHTML = "0" + gMiliseconds;

    }
    if (gMiliseconds > 99) {
        console.log("gSeconds");
        gSeconds++;
        elSeconds.innerHTML = "0" + gSeconds;
        gMiliseconds = 0;
        elMiliSec.innerHTML = "0" + gMiliseconds;
    }
    if (gSeconds > 9) {
        elSeconds.innerHTML = gSeconds;
    }
}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}
function drawNum() {
    return gNums.pop()
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function onEasy(elEasy) {
    difficult = parseInt(elEasy.value)
    onInit()
}
function onMedium(elMedium) {
    difficult = parseInt(elMedium.value)
    onInit()
}
function onHard(elHard) {
    difficult = parseInt(elHard.value)
    onInit()
}

function onResetGame() {
    const elSeconds = document.querySelector('.seconds')
    const elMiliSec = document.querySelector('.miliseconds')
    clearInterval(gInterval)
    elSeconds.innerHTML = '00'
    elMiliSec.innerHTML = '000'
    onInit()
}