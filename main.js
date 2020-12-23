// define the elements that will be used
const status = $('.turn');
const cell = $('.cell');
const restartButton = $('.restart')
let countX = 0;
let countO = 0;
var turn = 'X'


//#region game events

// add 3 events for all fo cell for who turn is 
// 1-mouseenter any cell
cell.mouseenter(function() {
        const play = event.target
        if (turn === 'X') {
            $(play).addClass('xx');
        } else {
            $(play).addClass('oo');
        }
        $(play).css('background-color', '#6d4c7f')
    })
    // 2-mouseleave any cell
cell.mouseleave(function() {
        const play = event.target
        if (turn === 'X') {
            $(play).removeClass('xx');
        } else {
            $(play).removeClass('oo');
        }
        $(play).css('background-color', '')
    })
    // 3-click on any cell by user 
cell.click(function() {
    const play = event.target

    // after X played add xx class & change the cell color & status 
    if (turn === 'X') {
        $(play).addClass('xx');
        $('.xx ').css('background-color', '#9c94ac')
        status.text("O's Turn Now")

        // check if the user X win 
        if (checkWin('xx') == true) {
            unbindWin(cell, turn)
        } else {
            turn = 'O'
            countX++;
        }
    } else {
        // after O played add oo class & change the cell color &  status 
        $(play).addClass('oo');
        $('.oo').css('background-color', '#9c94ac')
        status.text("X's Turn Now")

        // check if the user O win 
        if (checkWin('oo') == true) {
            unbindWin(cell, turn)
        } else {
            turn = 'X';
            countO++
        }
    }
    // if tie
    if (countX + countO == 9) {
        status.text("Game Over Try Again!!!")
        cell.css({ cursor: "context-menu" })
        countO = 0
        countX = 0
    }
    unbind(play)
})

//#endregion

// #region unbind 
function unbind(forWhat) {
    $(forWhat).unbind('mouseleave');
    $(forWhat).unbind('mouseenter');
    $(forWhat).unbind('click');
}

function unbindWin(forWhat, playerTurn) {
    unbind(forWhat)
    status.text("Player " + playerTurn + " Wiiiiin!!")
    status.css({ fontSize: "40px" })
    cell.css({ cursor: "context-menu" })
}
//#endregion

// #region Win
// who win the game
function checkWin(player) {
    if (classCheck($('#cel3'), $('#cel2'), $('#cel1'), player)) {
        winCell($('#cel3'), $('#cel2'), $('#cel1'))
        return true
    } else if (classCheck($('#cel4'), $('#cel5'), $('#cel6'), player)) {
        winCell($('#cel4'), $('#cel5'), $('#cel6'))
        return true
    } else if (classCheck($('#cel7'), $('#cel8'), $('#cel9'), player)) {
        winCell($('#cel7'), $('#cel8'), $('#cel9'))
        return true
    } else if (classCheck($('#cel1'), $('#cel4'), $('#cel7'), player)) {
        winCell($('#cel1'), $('#cel4'), $('#cel7'))
        return true
    } else if (classCheck($('#cel2'), $('#cel5'), $('#cel8'), player)) {
        winCell($('#cel2'), $('#cel5'), $('#cel8'))
        return true
    } else if (classCheck($('#cel3'), $('#cel6'), $('#cel9'), player)) {
        winCell($('#cel3'), $('#cel6'), $('#cel9'))
        return true
    } else if (classCheck($('#cel1'), $('#cel5'), $('#cel9'), player)) {
        winCell($('#cel1'), $('#cel5'), $('#cel9'))
        return true
    } else if (classCheck($('#cel3'), $('#cel5'), $('#cel7'), player)) {
        winCell($('#cel3'), $('#cel5'), $('#cel7'))
        return true
    } else {
        return false
    }
}

// check player cells if has the calss
function classCheck(cell1, cell2, cell3, player) {
    if ($(cell1).hasClass(player) &&
        $(cell2).hasClass(player) &&
        $(cell3).hasClass(player)) {
        return true
    }
}
// change the win cell to black
function winCell(cell1, cell2, cell3) {
    $(cell1).css('backgroundColor', 'black')
    $(cell2).css('backgroundColor', 'black')
    $(cell3).css('backgroundColor', 'black')
}

//#endregion

// restart the game by the button 
restartButton.on('click', function() {
    location.reload()
})