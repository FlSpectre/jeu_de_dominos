var dominos = get_player_hand();
var turn = 0;
function launch_game(test) {
    document.getElementById("menu").style.display ="none";
    document.getElementById("game").style.display ="flex";
    var y = document.getElementsByClassName("player")[0].id;
    set_dominos();
    asign_dominos();
    send_hand();
}
//var x = document.getElementsByClassName("player")[0].id;

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
    //aff_hand();
    send_hand();
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
    var new_array = randomize(array);
    var hand1 = [];
    var hand2 = [];
    for (var i = 0; i != 7; i++) {

        hand1[i] = array[i];
        array.splice(i, 1);
    }
    for (var i = 0; i != 7; i++) {
        hand2[i] = array[i];
        array.splice(i, 1);
    }
    return [hand1, hand2, array];
}

function send_hand() {
    aff_hand(dominos[1], dominos[0], dominos[2]);
}

function aff_hand(hand1, hand2, array) {
    var i;
    var j;
    var d1;
    var d2;
    if (turn == 1) {
        for (i = hand1.length - 1; i !== -1; i--) {
            d1 = ['d'] + hand1[i];
            document.getElementById(d1).style.display = "block";
        }
        for (j = hand2.length - 1; j !== -1; j--) {
            d2 = ['d'] + hand2[j];
            document.getElementById(d2).style.display = "none";
        }
    }
    else {
        for (j = hand2.length - 1; j !== -1; j--) {
            d2 = ['d'] + hand2[j];
            document.getElementById(d2).style.display = "block";
        }
        for (i = hand1.length - 1; i !== -1; i--) {
            d1 = ['d'] + hand1[i];
            document.getElementById(d1).style.display = "none";
    }
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


var nbr = 0;

var test = (function count() {
    nbr++;
})();

function select(nb) {
    console.log(test);
    if (nbr == 0) {
        test = nb;
        document.getElementById(nb).style.left = "0px";
    }
    else {
        document.getElementById(nb).style.left = "-20px";
        nbr = 0;
    }
    return stop;
}

function set_dominos() {
    this.id ="0";
    this.side1 ="0";
    this.side2 = "0";
    this.pos_x ="0";
    this.pos_y ="0";
    this.deg="0";
    this.valid="0";
    this.select="0";
    this.pose="0";
    this.aff="none";
}
var domino = new Array(27);

function asign_dominos() {
    var test;

    for (var i = 0; i != 28; i++) {
        domino[i] = new set_dominos();
    }
    for (var i = 0; i != 28; i++) {
        domino[i].id = "d" + i;
        test = domino[i].id;
        document.getElementById(test).style.display = "none";
    }
    asign_side1();
    asign_side2();
}

function asign_side2() {
    var x = 0;
    var y = 0;
    var check = 0;
    for (var i = 0; i != 28; i++) {
        domino[i].side2 = y;
        if (check == x + 1 || i == 0) {
            check = 0;
            x += 1;
            y++; 
        }
        check++;         
    }
}

function asign_side1() {
    var x = 0;
    var y = 0;
    var test = 0;

    for (var i = 0; i != 28; i++) {
        domino[i].side1 = y;
        if (y == test) {
            test++;
            y = 0;
            domino[i].side1 = y;
        }
        y++;
    }
    console.log(domino);
}