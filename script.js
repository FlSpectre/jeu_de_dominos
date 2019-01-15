
function launch_game(test) {
    document.getElementById("menu").style.display ="none";
    document.getElementById("game").style.display ="flex";
    var y = document.getElementsByClassName("player")[0].id;
    count_turn(x);
}
var x = document.getElementsByClassName("player")[0].id;
var turn = 1;

function count_turn(x) {
    if (turn == 0) {
        turn++;
        return(1);
    }
    if (turn == 1) {
            turn = 0;
    }
    return(2);
}

function new_turn(turn) {
    console.log(turn);
    document.getElementById("p1").innerHTML = "Player " + turn + " Turn ! Click to Play";
}

function gameplay() {
    document.getElementById("p1").style.display ="none";
}

function end_turn() {
    var x = document.getElementsByClassName("player")[0].id;
    var ok = count_turn(x);
    if (ok == 1) {
        new_turn(2);
    }
    else {
        new_turn(1);
    }
    document.getElementById("p1").style.display ="flex";
}
/*
    if (turn == 2 && (x == "3" || x == "4"))
        var player = 1;
        turn++;
        if (x == "3") {
            turn = 0;
        }

    }
    if (turn == 3 && x == "4")
        var player = 1;
        turn = 0;
    }
}
*/

function create_map() {
    
}