(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.core === 'undefined') ? myChessBot.core = ep(gth) : myChessBot.core = myChessBot.core : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var thismodule = win['myChessBot'];
    var positioncount = 0;
    var core = {};
    core['positioncount'] = positioncount;
    function minimax(game, depth, alpha, beta, ismaximisingplayer, sum, colour, randomly) {
        positioncount++
        var isopening = (function () {
            var rtv = false; var number0 = 0; game.board().forEach(function (val, idx, arr) {
                if (val) {
                    number0++;
                }
            });

            if (number0 > 15) {
                rtv = true;
            }
            return rtv;
        })()
        var children = game.moves({ verbose: true });
        var currmove;
        var colourvalue = (colour == 'w') ? 1 : -1;
        if (typeof randomly == "number") children.sort(function (a, b) { return a + randomly - b });
        if (depth <= 0 || children.length <= 0) {
            return [null, colourvalue * thismodule.evaluateBoard.evaluateBoard(game.board(), game, colour, isopening)];
        }
        var maxValue = -10000;
        var minValue = 10000;
        var bestmove;
        var bestmovevalue = sum;
        var childValue0 = sum;/*
        for (var i = 0; i < children.length; i++) {
            var val = children[i];
            currmove = val;
            var currmove0 = game.move(currmove);
            var newSum = minimax(currmove0, sum, game, colour);
            console.log(newSum);
            var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, colour);
            game.undo();
            if (ismaximisingplayer) {
                if (childValue > maxValue) {
                    maxValue = childValue;
                    bestmove = currmove0;
                }
                alpha = Math.max(alpha, childValue);
            } else {
                if (childValue < minValue) {
                    minValue = childValue;
                    bestmove = currmove0;
                }
                beta = Math.min(beta, childValue);
            }
            if (alpha >= beta) {
                return [bestmove, maxValue];
            }
        }*/
        if (ismaximisingplayer) {
            bestmovevalue = -100;
            for (var i = 0; i < children.length; i++) {
                var val = children[i];
                currmove = val;
                var currmove0 = game.move(currmove);
                var newSum = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, colour)[1];
                var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, colour);
                game.undo();
                if (bestmovevalue <= childValue) {
                    bestmovevalue = childValue;
                    bestmove = currmove0;
                }
                alpha = Math.max(alpha, newSum);
                if (alpha >= beta) {
                    return [bestmove, bestmovevalue];
                }
            }
            return [bestmove, bestmovevalue];
        } else {
            bestmovevalue = 100;
            for (var i = 0; i < children.length; i++) {
                var val = children[i];
                currmove = val;
                var currmove0 = game.move(currmove);
                var newSum = minimax(game, depth - 1, alpha, beta, ismaximisingplayer, newSum, colour)[1];
                var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, colour);
                game.undo();
                if (bestmovevalue >= childValue) {
                    bestmovevalue = childValue;
                    bestmove = currmove0;
                }
                beta = Math.min(beta, bestmovevalue);
                if (alpha >= beta) {
                    return [bestmove, bestmovevalue];
                }
            }
            return [bestmove, bestmovevalue];
        }
    }
    win['minimax'] = minimax;
    core['minimax'] = minimax;
    return core;
}, globalThis, globalThis['myChessBot']);