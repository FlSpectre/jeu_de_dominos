
function launch_game(test) {
    document.getElementById("menu").style.display ="none";
    document.getElementById("game").style.display ="flex";
    var y = document.getElementsByClassName("player")[0].id;
    get_player_hand();
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

function create_dominos() {
    var dominos = ["0","1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19","20","21","22",
    "23","24","25","26","27"];
    return dominos;
}

function get_player_hand() {
    var array = create_dominos();
    new_array = randomize(array);

    var new_array;
    var hand1 = [];
    var hand2 = [];
    var i = 0;

    while (i != 7) {
        hand1[i] = array[i];
        array.splice(i, 1);
        i++;
    } 
    console.log(hand1);
    console.log(array);
    aff_hand(hand1, array);
}

function aff_hand(hand1, array) {
    var i = hand1.length;
    var j = array.length;
    
    while (i !== 0) {
        test = ['d'] + hand1[i];
        console.log(test);

        document.getElementById(test).style.display = "none";
        i--;
    }
}

function randomize(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

function create_map() {
    
}