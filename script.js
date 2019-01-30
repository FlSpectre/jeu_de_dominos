var dominos = get_player_hand();
var hand_1 = dominos[1];
var hand_2 = dominos[0];
var pioche = dominos[2];
var in_game = new Array(28);
var turn = 0;
var tempo = 0; //supp apres test
var get = -1;
var domino_pose = 0;
var stock = 0;
var current_dom_index = -1;
var domino = new Array(28);
var valid_pioche = 0;
var action = 0;

function launch_game(player) {
    document.getElementById("menu").style.display ="none";
    document.getElementById("game").style.display ="flex";    
    document.getElementById("p1").style.display ="flex"; // a remettre
    set_dominos();        
    hover_player();
    asign_dominos();
    send_hand();
    set_dominos_hand_pos();
    asign_dominos_hand();
}


function check_win() {
    if (hand_1.length == 0 || hand_2.length == 0) {
        you_win();
    }
}

function you_win() {
    document.getElementById("game").style.display = "none";
    document.getElementById("win").style.display = "flex";
}

function hover_player() {
    if (turn == 1) {
        document.getElementById("player2").style.backgroundColor = "#D32F2F";
        document.getElementById("player1").style.backgroundColor = "#E57373";
    }
    else {
        document.getElementById("player2").style.backgroundColor = "#E57373";
        document.getElementById("player1").style.backgroundColor = "#D32F2F";

    }
}

function gestion_player () {

}

function back() {
    document.getElementById("both").style.display = "none";
    document.getElementById("menu").style.display = "flex";
    document.getElementById("rules").style.display = "none";
    document.getElementById("tuto").style.display = "none";      
}

function tuto() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("both").style.display = "flex";
    document.getElementById("tuto").style.display = "flex";        
    document.getElementById("rules").style.display = "none";
}

function rules() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("both").style.display = "flex";
    document.getElementById("tuto").style.display = "none";
    document.getElementById("rules").style.display = "flex";
}

function leave_game() {
    document.getElementById("game").style.display = "none";
    document.getElementById("menu").style.display = "flex";
}

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
    send_hand();
    set_dominos_hand_pos();
    hover_player();
    document.getElementById("p1").innerText = "Player " + turn + " Turn ! Press Enter to Play";
    document.getElementById("p1").style.fontSize = "100px";
    document.getElementById("p1").style.fontWeight = "700";
}

function gameplay() {
    document.getElementById("p1").style.display ="none";
}

function end_turn() {
    var x = document.getElementsByClassName("player")[0].id;
    action = 0;
    var ok = count_turn(x);
    if (ok == 1) {
        new_turn(2);
    }
    else {
        new_turn(1);
    }
    document.getElementById("p1").style.display ="flex";
}

var get_echap = 0;
function check_key(e) {
    var key = e.keyCode;
    if (key == 13 && get_echap == 0) {
        document.getElementById("p1").style.display ="none";
        get_echap = 1;
    }
    else if (key == 13 && get_echap == 1) {
        get_echap = 0;
        for (var i = 0; i != 28; i++) {
            domino[i].took = 0;
        }
        end_turn();
    }
    else if (key == 112 && get_echap == 1) {
        do_pioche();
    }
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
        hand1[i] = 'd' + array[i];
        array.splice(i, 1);
    }
    for (var i = 0; i != 7; i++) {
        hand2[i] = 'd' + array[i];
        array.splice(i, 1);
    }
    return [hand1, hand2, array];
}

function send_hand() {
    aff_hand();
    aff_dom_pose();
}

function aff_hand() {
    if (turn == 1) {
        for (var i = 0; i != hand_2.length; i++) {
            document.getElementById(hand_2[i]).style.display = "block";
        }
        for (var i = 0; i != hand_1.length; i++) {
            document.getElementById(hand_1[i]).style.display = "none";
        }
    }
    else {
        for (var i = 0; i != hand_2.length; i++) {
            document.getElementById(hand_2[i]).style.display = "none";
        }
        for (var i = 0; i != hand_1.length; i++) {
        document.getElementById(hand_1[i]).style.display = "block";    
       }
    }
}

function aff_dom_pose() {
    if (current_dom_index != -1) {
        for (var i = 0; i != 28; i++) {
            if (domino[i].pose != 0) {
            document.getElementById(domino[i].id).style.display = "block";
            }
        }
    }
}

function set_dominos_hand_pos() {
    var space = 50;

    for (var i = 0; i != hand_2.length; i++) {
        document.getElementById(hand_2[i]).style.left = "10px";
        document.getElementById(hand_2[i]).style.top = space + "px";
        space = space + 70;
    }
    space = 50;
    for (var i = 0; i != hand_1.length; i++) {
        document.getElementById(hand_1[i]).style.left = "10px";
        document.getElementById(hand_1[i]).style.top = space + "px";
        space = space + 70;
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

function set_dominos() {
    this.place= -1;
    this.id ="0";
    this.nb =0;
    this.side1 ="0";
    this.side2 = "0";
    this.hand = "0";
    this.pos_x ="0";
    this.pos_y ="0";
    this.valid="0";
    this.took="0";
    this.pose="0";
    this.deg="0";
    this.free="0"; // free = 0 right ok ; -----  free = 1 top ok; ----  free = 2 left ok; ---- free = 3 bot ok;
    this.fside= 0;
    this.get_last_place;
}

function asign_dominos() {
    var test;

    for (var i = 0; i != 28; i++) {
        domino[i] = new set_dominos();
        in_game[i] = new set_dominos();
    }
    for (var i = 0; i != 28; i++) {
        domino[i].id = "d" + i;
        domino[i].nb = i;
        test = domino[i].id;
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
}

function get_select(recup) {  
    for(var i = 0; i != 28; i++) {
        if (domino[i].id == recup.id) {
            for(var j = 0; j != 28; j++) {
                domino[j].took = 0;
                if (domino[j].pose == 0) {
                    document.getElementById(domino[j].id).style.left = "10px";
                }
            }
            if (domino[i].pose == 0) {
                document.getElementById(domino[i].id).style.left = "30px";
            }
            domino[i].took = 1;
            return;
        }
    }
}

function asign_dominos_hand() {
    var j = 0;
    var k = 0;

    for (var i = 0; i != 28; i++) {
        for (var j = 0; j != 7; j++) {
        if (hand_1[j] == domino[i].id) {
            domino[i].hand = "2";
           }
        }
        for (var j = 0; j != 7; j++) {
            if (hand_2[j] == domino[i].id) {
                domino[i].hand = "1";
               }
            }
    }
}

function slice_hand(i, id) {
    if (i == 2) {
        for (var x = 0; x != 28; x++) {
            if (hand_2[x] == id) {
                hand_2.splice(x, 1);
            }    
        }
    }
    if (i == 1) {
        for (var x = 0; x != 28; x++) {
            if (hand_1[x] == id) {
                hand_1.splice(x, 1);
            }    
        }
    }
}

function do_pioche() {
    if (action == 1) {
        return;
    }
    if (pioche[0] == null) {
        return -1;
    } 
    if (check_pioche() == 1) {
        hand_1.push('d' + pioche[0]);
        pioche.splice(0, 1);
    }
    else if (check_pioche() == 2) {
        hand_2.push('d' + pioche[0]);
        pioche.splice(0, 1);
    }
    action = 1;
    set_dominos_hand_pos();
    send_hand();
}

function check_pioche() {
    for (var i = 0; i != 28; i++) {
        if (turn == 1) {
            return 2;
        }
    } 
    for (var i = 0; i != 28; i++) {
        if (turn != 1) {
            return 1;
        }
    }
}
var stock_p1 = 0;
var stock_p2 = 0;
checkk = 0;
function printMousePos(event) {
    for (var i = 0; i != 28; i++) {
        if (domino[i].took == 1 && domino[i].pose == 0 && action == 0) {
            domino[i].pos_x = event.clientX;
            domino[i].pos_y = event.clientY;
            tempo = i;
            if (liste.length > 1) {
                stock = liste[liste.length - 1].nb;
                checkk = 2;
            }
               if (call_call(event) == -1) {
                stock = liste[0].nb;
                checkk = 1;
                console.log(stock);
                if (call_call(event) == -1) {
                    test = 0;
                    domino[i].took = 0;
                    domino[i].pose = 0;
                    document.getElementById(domino[i].id).style.left = "10px";
                    console.log("JE BEUG", domino[i]);
                    return;
                }
            }
            test = 0;
            domino[i].get_last_place = domino[i].id;
            domino[i].took = 0;
            domino[i].pose = 1;
            current_dom_index = i;
            //in_game[j] = domino[i];
            domino_pose++;
            if (turn == 1) {
                slice_hand(2, domino[i].id);
            }
            else {
                slice_hand(1, domino[i].id);
            }
            action = 1;
            set_dominos_hand_pos();
            send_hand();
            check_win();
            console.log("liste : ", liste);
            return;
        }
    }
  }
  var el = document.getElementById("plateau");

  el.addEventListener("click", printMousePos);
  window.addEventListener("keypress", check_key);
   /* document.addEventListener("click", get_click);

  function get_click(e) {
    console.log("click x : ", e.clientX);
    console.log("click y : ", e.clientY);    
  }*/

  // 100 * 56 domino

/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
/* ************************************************************************************************** */
var liste = [];
var count = 0;
function call_call(e) {
    if (domino[stock].deg == 0 || domino[stock].deg == 180) {
        if (call_check_nr(e) == -1) {
            return -1;
        }
    }
    else if (call_check_r(e) == -1) {
        return -1;        
    }
    return 0;
}

function call_check_r(e) {
    if (check_top(e) != 0);
    else if (check_bot(e) != 0);
    else if (check_ltop(e) != 0);
    else if (check_rtop(e) != 0);
    else if (check_lbot(e) != 0);
    else if (check_rbot(e) != 0);
    else {
        return -1;
    }
   stock = tempo;
} 
function call_check_nr(e) {
    if (first_pose(e) != 0);
    else if (check_left(e) != 0);
    else if (check_right(e) != 0);
    else if (check_tleft(e) != 0);
    else if (check_bleft(e) != 0);
    else if (check_tright(e) != 0);
    else if (check_bright(e) != 0);
    else {
    return (-1);
    }
    count++;
    stock = tempo;
}

function first_pose(e) {
    if (domino_pose == 0) {
        document.getElementById(domino[tempo].id).style.left = domino[tempo].pos_x  + "px";
        document.getElementById(domino[tempo].id).style.top = domino[tempo].pos_y  +"px";
        domino_pose = 1;
        liste.push(domino[tempo]);
        liste[0].place = 1;
        domino[tempo].fside++;
        return (1);
    }
    return(0);
}


function check_left(e) {
    if (e.clientX - 1 < domino[stock].pos_x &&  // LEFT
        e.clientY + 1> domino[stock].pos_y &&
        e.clientX + 1> domino[stock].pos_x - 100 &&
        e.clientY - 1< domino[stock].pos_y + 50) {
            console.log("left");
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "left") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "left";
            if (domino[stock].side1 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
                domino[tempo].deg = 90;
            }
            if (domino[stock].side1 == domino[tempo].side1) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                domino[tempo].deg = 180;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y;
        domino[tempo].pos_x = domino[stock].pos_x - 100;
        document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 100 +  "px";
        document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y  + "px";
        return(1);
    }
    return (0);
}

function check_right(e) {
    if (e.clientX >= domino[stock].pos_x + 100 && // RIGHT
        e.clientY >= domino[stock].pos_y &&
        e.clientX <= domino[stock].pos_x + 150 &&
        e.clientY <= domino[stock].pos_y + 50) {
            console.log("right");
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "right") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "right";
            if (domino[stock].side2 == domino[tempo].side1) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
                domino[tempo].deg = 0;
            }
            if (domino[stock].side2 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
                domino[tempo].deg = 180;
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y;
            domino[tempo].pos_x = domino[stock].pos_x + 100;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x + 100 + "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y  + "px";
            return(1);
        }
        return (0);
}

function check_tleft(e) {
    if (e.clientX > domino[stock].pos_x && // TOP LEFT
        e.clientY < domino[stock].pos_y &&
        e.clientX < domino[stock].pos_x + 50 &&
        e.clientY > domino[stock].pos_y - 50) {
            console.log("tleft");
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "left") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "top";
            if (domino[stock].side1 == domino[tempo].side2) {
                 document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
                 domino[tempo].deg = 90;
            }
            if (domino[stock].side1 == domino[tempo].side1) {
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;       
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';               
                domino[tempo].deg = 270;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y - 100;
            domino[tempo].pos_x = domino[stock].pos_x;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 22 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y - 75 + "px";
            return(1);
        }
        return (0);
}

function check_tright(e) {
    if (e.clientX > domino[stock].pos_x + 50 && // TOP RIGHT
        e.clientY <= domino[stock].pos_y &&
        e.clientX <= domino[stock].pos_x + 100 &&
        e.clientY >= domino[stock].pos_y - 50) {
            console.log("tright");
            var non = 0;
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "right") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "top";
            if (domino[stock].side2 == domino[tempo].side1) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                domino[tempo].deg = 270;
                non = 1;
            }
            if (domino[stock].side2 == domino[tempo].side2 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
                domino[tempo].deg = 90;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].deg = 90;
            domino[tempo].pos_y = domino[stock].pos_y - 100;
            domino[tempo].pos_x = domino[stock].pos_x + 44;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x + 22 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y - 75 + "px";
            return(1);
        }
        return (0);
}

function check_bleft(e) {
    if (e.clientX >= domino[stock].pos_x && // BOT LEFT
        e.clientY >= domino[stock].pos_y + 56 &&
        e.clientX <= domino[stock].pos_x + 50 &&
        e.clientY <= domino[stock].pos_y + 106) {
            console.log("bleft");
            var non = 0;
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "left") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "bot";
            if (domino[stock].side1 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';
                domino[tempo].deg = 270;
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                non = 1;
            }
            if (domino[stock].side1 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
                domino[tempo].deg = 90;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y + 56;
            domino[tempo].pos_x = domino[stock].pos_x;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 22 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + 75 + "px";
            console.log(domino[stock].pos_x);
            console.log(domino[stock].pos_y);
            return(1);
        }
        return (0);
}

function check_bright(e) {
    if (e.clientX >= domino[stock].pos_x + 50 && // BOT RIGHT
        e.clientY >= domino[stock].pos_y + 56 &&
        e.clientX <= domino[stock].pos_x + 100 &&
        e.clientY <= domino[stock].pos_y + 106) {
            var non = 0;
            console.log("bright");
            console.log(domino[tempo].side1);
            console.log(domino[tempo].side2);
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "right") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "bot";
            if (domino[stock].side2 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                non = 1;
            domino[tempo].deg = 270;
            }
            if (domino[stock].side2 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
            domino[tempo].deg = 90;                
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y + 50;
            domino[tempo].pos_x = domino[stock].pos_x + 44;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x + 22 + "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + 75 + "px";
            return(1);
        }
        return (0);
}
/* -------------------------------------------------------------------------------------------------------- */
function check_top(e) {
    if (e.clientX > domino[stock].pos_x + 1 && // top 90
        e.clientY < domino[stock].pos_y &&
        e.clientX < domino[stock].pos_x + 56 &&
        e.clientY > domino[tempo].pos_y  - 50) {
            var non = 0;
            console.log("tottp");
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "top") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "top";
            if (domino[stock].side1 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
                non = 1;
            domino[tempo].deg = 90;
            }
            if (domino[stock].side1 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
            domino[tempo].deg = 270;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y - 100;
            domino[tempo].pos_x = domino[stock].pos_x;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 22 + "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y -75 +"px";
            return (1);
        }
    return (0);
}

function check_bot(e) {
    if (e.clientX > domino[stock].pos_x + 1 && // bot 90
        e.clientY > domino[stock].pos_y + 100&&
        e.clientX < domino[stock].pos_x + 56 &&
        e.clientY < domino[stock].pos_y + 150) {
            var non = 0;
            console.log(domino[stock].pos_x);
            console.log(domino[stock].pos_y);
            console.log("bottt");        
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "bot") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "bot";
            if (domino[stock].side2 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+270+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                non = 1;
            domino[tempo].deg = 270;
            }
            if (domino[stock].side2 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+90+'deg)';
            domino[tempo].deg = 90;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y + 100;
            domino[tempo].pos_x = domino[stock].pos_x;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 22 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + 125 + "px";
            return(1);
        }
    return (0);
}

function check_ltop(e) {
    if (e.clientX < domino[stock].pos_x + 1 && // top 90
        e.clientY > domino[stock].pos_y  &&
        e.clientX > domino[stock].pos_x - 50 &&
        e.clientY < domino[stock].pos_y + 50) {
            var non = 0;
            console.log("bad ltop");
            console.log(domino[stock].pos_y);            
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "top") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "left";
            if (domino[stock].side1 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
                non = 1;
            domino[tempo].deg = 0;

            }
            if (domino[stock].side1 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                domino[tempo].deg = 180;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y;
            domino[tempo].pos_x = domino[stock].pos_x - 100;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 100 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y   + "px";
            return (1);
        }
    return (0);
}

function check_rtop(e) {
    if (e.clientX > domino[stock].pos_x + 6 && // top 90
        e.clientY > domino[stock].pos_y  &&
        e.clientX < domino[stock].pos_x + 106 &&
        e.clientY < domino[stock].pos_y + 50) {
            var non = 0;
            console.log("bad rtop");
            if (domino[stock].side1 != domino[tempo].side1 && domino[stock].side1 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "top") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "right";
            if (domino[stock].side1 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                non = 1;
            domino[tempo].deg = 180;

            }
            if (domino[stock].side1 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
            domino[tempo].deg = 0;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y;
            domino[tempo].pos_x = domino[stock].pos_x + 56;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x + 56 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + "px";
            return (1);
        }
    return (0);
}

function check_lbot(e) { 
    if (e.clientX < domino[stock].pos_x  && // top 90
        e.clientY > domino[stock].pos_y + 50 &&
        e.clientX > domino[stock].pos_x - 50 &&
        e.clientY < domino[stock].pos_y + 100) {
            var non = 0;
            console.log("bad lbot");
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "bot") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "left";
            if (domino[stock].side2 == domino[tempo].side2) {
            domino[tempo].deg = 0;
            document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
                
                non = 1;
            }
            if (domino[stock].side2 == domino[tempo].side1 && non == 0) {
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
            domino[tempo].deg = 180;
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y + 44;
            domino[tempo].pos_x = domino[stock].pos_x - 100;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x - 100 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + 44 + "px";
            return (1);
        }
    return (0);
}

function check_rbot(e) {
    if (e.clientX > domino[stock].pos_x + 56 && // top 90
        e.clientY > domino[stock].pos_y + 50&&
        e.clientX < domino[stock].pos_x + 106 &&
        e.clientY < domino[stock].pos_y + 100) {
            var non = 0;
            console.log("je suis ici");
            if (domino[stock].side2 != domino[tempo].side1 && domino[stock].side2 != domino[tempo].side2) {
                return (0);
            }
            if (domino[stock].free != 0 && domino[stock].free != "bot") {
                console.log("pas ici stp");
                return (0);
            }
            domino[tempo].free = "right";
            if (domino[stock].side2 == domino[tempo].side2) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+180+'deg)';
                var test = domino[tempo].side1;
                domino[tempo].side1 = domino[tempo].side2;
                domino[tempo].side2 = test;
                non = 1;
            domino[tempo].deg = 180;

            }
            if (domino[stock].side2 == domino[tempo].side1 && non == 0) {
                document.getElementById(domino[tempo].id).style.transform = 'rotate('+0+'deg)';
                domino[tempo].deg = 0; 
            }
            if (checkk == 2) {
                liste.push(domino[tempo]);
                liste[liste.length - 1].place = 2;
                liste[liste.length - 2].place = -1;
            }
            else {
                liste.unshift(domino[tempo]);
                liste[0].place = 1;
                liste[1].place = -1;
            }
            domino[tempo].pos_y = domino[stock].pos_y + 44;
            domino[tempo].pos_x = domino[stock].pos_x + 56;
            document.getElementById(domino[tempo].id).style.left = domino[stock].pos_x + 56 +  "px";
            document.getElementById(domino[tempo].id).style.top = domino[stock].pos_y + 44 +"px";
            return (1);
        }
    return (0);
}