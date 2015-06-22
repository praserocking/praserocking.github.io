/*
Author: Shenbaga Prasanna
Date: 18/06/2015
Approach: Minimax Theorem
PS: If you can beat the system, ping me at shenbagaprasanna@gmail.com.
*/
var symbol = "O";
var map_grid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var x_wins = 0, o_wins = 0, draw = 0;

var flip = function () { symbol = symbol == "O" ? "X" : "O"; };

var no_sym = function (a, b) {
    return a == '-' && b == '-';
};

var both_sym = function (a, b, symbol) {
    return a == symbol && b == symbol;
};
var if_one = function (a, b, c, symbol) {
    var result = false;
    if (a == symbol || b == symbol || c == symbol) {
        if (no_sym(a, b) || no_sym(b, c) || no_sym(a, c)) {
            result = true;
        }
    }
    return result;
};
var if_two = function (a, b, c, symbol) {
    var result = false;
    if (a == '-' || b == '-' || c == '-') {
        if (both_sym(a, b, symbol) || both_sym(b, c, symbol) || both_sym(a, c, symbol)) {
            result = true;
        }
    }
    return result;
};

var check_eq = function (a, b, c, symbol) {
    return (a == symbol) && (a == b) && (b == c);
};

var three_corner_empty = function () {
    var corners = [map_grid[0][0], map_grid[0][2], map_grid[2][2], map_grid[2][0]];
    var count = 0;
    corners.forEach(function (node) {
        if (node == '-')
            count++;
    });
    return count >= 3;
};

var reset = function () {
    symbol = "O";
    map_grid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    $(".box").each(function () {
        $(this).html("");
    });
};

var AI_Turn = function () {
    var max_score_x = -999999999,max_score_o = -999999999;
    var mi, mj, score_x,score_o;
    if (isempty()) {
        mi = 1;
        mj = 1;
    }
    else {
        for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (map_grid[i][j] == '-') {
                        score_x = calc_score(i, j, "X", "O");
                        if (max_score_x < score_x) {
                            max_score_x = score_x;
                            mi = i;
                            mj = j;
                        }
                    }
                }
        }
    }
    map_grid[mi][mj] = "X";
    $("#" + mi + mj).html("X");
};


var calc_score = function (x, y, fav, agn) {
    score = 0;
    map_grid[x][y] = fav;
    for (var i = 0; i < 3; i++) {
        if (if_one(map_grid[i][0], map_grid[i][1], map_grid[i][2], fav)) {
            score += 1;
        }
        if (if_two(map_grid[i][0], map_grid[i][1], map_grid[i][2], fav)) {
            score += 10;
        }
        if (check_eq(map_grid[i][0], map_grid[i][1], map_grid[i][2], fav)) {
            score += 100;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (if_one(map_grid[0][i], map_grid[1][i], map_grid[2][i], fav)) {
            score += 1;
        }
        if (if_two(map_grid[0][i], map_grid[1][i], map_grid[2][i], fav)) {
            score += 10;
        }
        if (check_eq(map_grid[0][i], map_grid[1][i], map_grid[2][i], fav)) {
            score += 100;
        }
    }
    if (if_one(map_grid[0][0], map_grid[1][1], map_grid[2][2], fav))
        score += 1;
    if (if_two(map_grid[0][0], map_grid[1][1], map_grid[2][2], fav))
        score += 10;
    if (check_eq(map_grid[0][0], map_grid[1][1], map_grid[2][2], fav))
        score += 100;
    if (if_one(map_grid[0][2], map_grid[1][1], map_grid[2][0], fav))
        score += 1;
    if (if_two(map_grid[0][2], map_grid[1][1], map_grid[2][0], fav))
        score += 10;
    if (check_eq(map_grid[0][2], map_grid[1][1], map_grid[2][0], fav))
        score += 100;

    for (var i = 0; i < 3; i++) {
        if (if_one(map_grid[i][0], map_grid[i][1], map_grid[i][2], agn)) {
            score -= 1;
        }
        if (if_two(map_grid[i][0], map_grid[i][1], map_grid[i][2], agn)) {
            score -= 10;
        }
        if (check_eq(map_grid[i][0], map_grid[i][1], map_grid[i][2], agn)) {
            score -= 100;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (if_one(map_grid[0][i], map_grid[1][i], map_grid[2][i], agn)) {
            score -= 1;
        }
        if (if_two(map_grid[0][i], map_grid[1][i], map_grid[2][i], agn)) {
            score -= 10;
        }
        if (check_eq(map_grid[0][i], map_grid[1][i], map_grid[2][i], agn)) {
            score -= 100;
        }
    }
    if (if_one(map_grid[0][0], map_grid[1][1], map_grid[2][2], agn))
        score -= 1;
    if (if_two(map_grid[0][0], map_grid[1][1], map_grid[2][2], agn))
        score -= 10;
    if (check_eq(map_grid[0][0], map_grid[1][1], map_grid[2][2], agn))
        score -= 100;
    if (if_one(map_grid[0][2], map_grid[1][1], map_grid[2][0], agn))
        score -= 1;
    if (if_two(map_grid[0][2], map_grid[1][1], map_grid[2][0], agn))
        score -= 10;
    if (check_eq(map_grid[0][2], map_grid[1][1], map_grid[2][0], agn))
        score -= 100;
    map_grid[x][y] = '-';
    return score;
};


var checkwin = function (symbol) {
    var result = false;
    for (var i = 0; i < 3; i++) {
        if (check_eq(map_grid[i][0], map_grid[i][1], map_grid[i][2], symbol)) {
            result = true;
        }
    }
    if (!result) {
        for (var i = 0; i < 3; i++) {
            if (check_eq(map_grid[0][i], map_grid[1][i], map_grid[2][i], symbol)) {
                result = true;
            }
        }
    }
    if (!result) {
        if (check_eq(map_grid[0][0], map_grid[1][1], map_grid[2][2], symbol)) {
            result = true;
        }
    }
    if (!result) {
        if (check_eq(map_grid[0][2], map_grid[1][1], map_grid[2][0], symbol)) {
            result = true;
        }
    }

    return result;
};

var checkdraw = function () {
    var result = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (map_grid[i][j] == '-') {
                result = false;
                break;
            }
        }
        if (!result)
            break;
    }
    return result;
};

var isempty = function () {
    var result = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (map_grid[i][j] != "-") {
                result = false;
                break;
            }
        }
        if (!result)
            break;
    }
    return result;
};

var update_scores = function () {
    $("#xscore span").html(x_wins);
    $("#oscore span").html(o_wins);
    $("#draw span").html(draw);
};

$(document).ready(function () {
    update_scores();
    $(".box").on("click", function () {
        if ($(this).html() == "") {
            var index = $(this).context.id.split("");
            map_grid[parseInt(index[0])][parseInt(index[1])] = symbol;
            $(this).html(symbol);
            if (checkwin(symbol)) {
                alert(symbol);
                o_wins++;
                update_scores();
                reset();
            }
            if (checkdraw()) {
                alert("draw");
                draw++;
                update_scores();
                reset();
            }
            AI_Turn();
            if (checkwin("X")) {
                alert("X");
                x_wins++;
                update_scores();
                reset();
            }
            if (checkdraw()) {
                alert("draw");
                draw++;
                update_scores();
                reset();
            }
        }
    });
});
