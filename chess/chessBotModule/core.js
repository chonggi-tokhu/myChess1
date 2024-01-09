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
        var maxValue = -10000;
        var minValue = 10000;
        var bestmove;
        var childValue0 = sum;/*
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
            for (var i = 0; i < children.length; i++) {
                var val = children[i];
                currmove = val;
                var currmove0 = game.move(currmove);
                var newSum = thismodule.evaluateBoard.evaluateBoard(currmove0, sum, game, colour);
                console.log(newSum);
                var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, false, newSum, colour);
                game.undo();
                if (childValue >= minimax(game, depth - 1, alpha, beta, false, newSum, colour)[1]) {
                    childValue = minimax(game, depth - 1, alpha, beta, false, newSum, colour)[1];
                    bestmove = currmove0;
                    console.log(bestmove);
                }
                alpha = Math.max(alpha, childValue0);
                if (alpha >= beta) {
                    return [bestmove, childValue];
                }
            }
            return [bestmove, childValue];
        } else {
            for (var i = 0; i < children.length; i++) {
                var val = children[i];
                currmove = val;
                var currmove0 = game.move(currmove);
                var newSum = thismodule.evaluateBoard.evaluateBoard(currmove0, sum, game, colour);
                console.log(newSum);
                var [childBestMove, childValue] = minimax(game, depth - 1, alpha, beta, true, newSum, colour);
                game.undo();
                if (childValue <= minimax(game, depth - 1, alpha, beta, true, newSum, colour)[1]) {
                    childValue = minimax(game, depth - 1, alpha, beta, true, newSum, colour)[1];
                    bestmove = currmove0;
                }
                beta = Math.min(beta, childValue0);
                if (alpha >= beta) {
                    return [bestmove, childValue];
                }
            }
            return [bestmove, childValue];
        }
    }
    win['minimax'] = minimax;
    core['minimax'] = minimax;
    return core;
}, globalThis, globalThis['myChessBot']);