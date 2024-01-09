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
        var children = game.moves({ verbose: true });
        var currmove;

        if (typeof randomly == "number") children.sort(function (a, b) { return a + randomly - b });
        if (depth <= 0 || children.length <= 0) {
            return [null, sum];
        }
        var maxValue = Number.NEGATIVE_INFINITY;
        var minValue = Number.POSITIVE_INFINITY;
        var bestmove;
        for (var i = 0; i < children.length; i++) {
            var val = children[i];
            currmove = val;
            var currmove0 = game.move(currmove);
            var newSum = thismodule.evaluateBoard.evaluateBoard(currmove0, sum, game, colour);
            console.log(newSum);
            var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, colour);
            game.undo();
            if (ismaximisingplayer) {
                if (childValue > maxValue) {
                    maxValue = childValue;
                    bestmove = currmove0;
                }
                if (childValue > alpha) {
                    alpha = childValue;
                }
            } else {
                if (childValue < minValue) {
                    minValue = childValue;
                    bestmove = currmove0;
                }
                if (childValue < beta) {
                    beta = childValue;
                }
            }
            if (alpha >= beta) {
                break;
            }
        }
        if (ismaximisingplayer) {
            return [bestmove, maxValue];
        } else {
            return [bestmove, minValue];
        }
    }
    win['minimax'] = minimax;
    core['minimax'] = minimax;
    return core;
}, globalThis, globalThis['myChessBot']);