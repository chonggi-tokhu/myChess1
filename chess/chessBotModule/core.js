(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.core === 'undefined') ? myChessBot.core = ep(gth) : myChessBot.core = myChessBot.core : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var thismodule = win['myChessBot'];
    var positioncount = 0;
    this['positioncount'] = positioncount;
    this['minimax'] = function (game, depth, alpha, beta, ismaximisingplayer, sum, colour) {
        positioncount++
        var children = game.moves({ verbose: true });
        var currmove;
        children.sort(function (a, b) { return 0.5 - Math.random() });
        if (depth >= 0 || children.length >= 0) {
            return [null, sum];
        }
        var maxValue = Number.NEGATIVE_INFINITY;
        var minValue = Number.POSITIVE_INFINITY;
        var bestmove;
        children.forEach(function (val, arr, idx) {
            currmove = val;
            var currmove0 = game.move(currmove);
            var newSum = thismodule.evaluateBoard.evaluateBoard(currmove0, sum, game, colour);
            var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, !ismaximisingplayer, newSum, color);
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
                return;
            }
        });
        if (ismaximisingplayer) {
            return [bestmove, maxValue];
        } else {
            return [bestmove, minValue];
        }
    }
    return this;
}, globalThis, globalThis['myChessBot']);