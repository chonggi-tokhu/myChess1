(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.core === 'undefined') ? myChessBot.core = ep(gth) : myChessBot.core = myChessBot.core : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var thismodule = win['myChessBot'];
    var positioncount = 0;
    var core = {};
    core['positioncount'] = positioncount;
    /*function minimax(game, depth, alpha, beta, ismaximisingplayer, sum, colour, randomly) {
        positioncount++
        var isopening = true;
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
        var childValue0 = sum;
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
        }
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
    }*/

    var boardinsimplearr = function (myparam2) {
        var rtv = [];
        for (var i = 0; i < myparam2.length; i++) {
            for (var i1 = 0; i1 < myparam2[i].length; i1++) {
                rtv.push[myparam2[i][i1]];
            }
        }
        return rtv;
    };
    var squaresandtheirIdx = (function (board) {
        rtv = [];
        board.rank.forEach(function (val, idx, arr) {
            var ranknumber = val;
            var ranknumberstring = val.toString();
            board.file.forEach(function (val1, idx1, arr1) {
                rtv.push(ranknumberstring + val1);
            });
        });
        return rtv;
    })({ rank: [8, 7, 6, 5, 4, 3, 2, 1], file: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] });
    var idxesandtheirsquares = (function (board) {
        rtv = {};
        var idxnumber = 0;
        board.rank.forEach(function (val, idx, arr) {
            var ranknumber = val;
            var ranknumberstring = val.toString();
            board.file.forEach(function (val1, idx1, arr1) {
                rtv[ranknumberstring + val1] = idxnumber;
                idxnumber++
            });
        });
        return rtv;
    })({ rank: [8, 7, 6, 5, 4, 3, 2, 1], file: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] });
    function minimax(game, depth, alpha, beta, isMaximisingPlayer, sum, colour) {
        positioncount++;
        var children = game.ugly_moves();

        // Sort moves randomly, so the same move isn't always picked on ties

        var currMove;
        // Maximum depth exceeded or node is a terminal node (no children)
        if (depth <= 0 || children.length <= 0) {
            return [null, sum];
        }

        // Find maximum/minimum from list of 'children' (possible moves)
        var maxValue = -1000;
        var minValue = 1000;
        var bestMove;

        var OME = (function (myparam1) {
            var rooknumber = 0;
            var pawnnumber = 0;
            myparam1.forEach(function (val, idx, arr) {
                if (val.type == 'r') {
                    rooknumber++
                }
                if (val.type == 'p') {
                    pawnnumber++
                }
            });
            if (rooknumber <= 2) {
                return 'endGame';
            } else {
                if (pawnnumber >= 12) {
                    return 'Opening';
                } else {
                    return 'middlegame';
                }
            }
        })(boardinsimplearr(game.board()));
        for (var i = 0; i < children.length; i++) {
            currMove = children[i];
            // Note: in our case, the 'children' are simply modified game states
            var currPrettyMove = game.ugly_move(currMove);
            game.undo();
            var newSum = thismodule.evaluateBoard.evaluateBoard(game, currPrettyMove, sum, OME, colour);

            var [childBestMove, childValue] = minimax(
                game,
                depth - 1,
                alpha,
                beta,
                !isMaximisingPlayer,
                newSum,
                colour
            );

            if (isMaximisingPlayer) {
                if (childValue > maxValue) {
                    maxValue = childValue;
                    bestMove = currPrettyMove;
                    console.log(bestMove);
                }
                if (childValue > alpha) {
                    alpha = childValue;
                }
            } else {
                if (childValue < minValue) {
                    minValue = childValue;
                    bestMove = currPrettyMove;
                }
                if (childValue < beta) {
                    beta = childValue;
                }
            }

            // Alpha-beta pruning
            if (alpha >= beta && typeof bestMove != "undefined") {
                break;
            }
        }

        if (isMaximisingPlayer) {
            return [bestMove, maxValue];
        } else {
            return [bestMove, minValue];
        }
    }
    win['minimax'] = minimax;
    core['minimax'] = minimax;
    return core;
}, globalThis, globalThis['myChessBot']);