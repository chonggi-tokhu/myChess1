(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.evaluateBoard === 'undefined') ? myChessBot.evaluateBoard = ep(gth) : myChessBot.evaluateBoard = myChessBot.evaluateBoard : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var windowobj = win;
    var thismodule = windowobj['myChessBot'];
    var evaluateBoardmodule = {};
    /*var weights = { 'p': 100, 'n': 280, 'b': 320, 'r': 479, 'q': 929, 'k': 60000, 'k_e': 60000 };
    var pst_w = {
        'p': [
            [100, 100, 100, 100, 105, 100, 100, 100],
            [78, 83, 86, 73, 102, 82, 85, 90],
            [7, 29, 21, 44, 40, 31, 44, 7],
            [-17, 16, -2, 15, 14, 0, 15, -13],
            [-26, 3, 10, 9, 6, 1, 0, -23],
            [-22, 9, 5, -11, -10, -2, 3, -19],
            [-31, 8, -7, -37, -36, -14, 3, -31],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        'n': [
            [-66, -53, -75, -75, -10, -55, -58, -70],
            [-3, -6, 100, -36, 4, 62, -4, -14],
            [10, 67, 1, 74, 73, 27, 62, -2],
            [24, 24, 45, 37, 33, 41, 25, 17],
            [-1, 5, 31, 21, 22, 35, 2, 0],
            [-18, 10, 13, 22, 18, 15, 11, -14],
            [-23, -15, 2, 0, 2, 0, -23, -20],
            [-74, -23, -26, -24, -19, -35, -22, -69]
        ],
        'b': [
            [-59, -78, -82, -76, -23, -107, -37, -50],
            [-11, 20, 35, -42, -39, 31, 2, -22],
            [-9, 39, -32, 41, 52, -10, 28, -14],
            [25, 17, 20, 34, 26, 25, 15, 10],
            [13, 10, 17, 23, 17, 16, 0, 7],
            [14, 25, 24, 15, 8, 25, 20, 15],
            [19, 20, 11, 6, 7, 6, 20, 16],
            [-7, 2, -15, -12, -14, -15, -10, -10]
        ],
        'r': [
            [35, 29, 33, 4, 37, 33, 56, 50],
            [55, 29, 56, 67, 55, 62, 34, 60],
            [19, 35, 28, 33, 45, 27, 25, 15],
            [0, 5, 16, 13, 18, -4, -9, -6],
            [-28, -35, -16, -21, -13, -29, -46, -30],
            [-42, -28, -42, -25, -25, -35, -26, -46],
            [-53, -38, -31, -26, -29, -43, -44, -53],
            [-30, -24, -18, 5, -2, -18, -31, -32]
        ],
        'q': [
            [6, 1, -8, -104, 69, 24, 88, 26],
            [14, 32, 60, -10, 20, 76, 57, 24],
            [-2, 43, 32, 60, 72, 63, 43, 2],
            [1, -16, 22, 17, 25, 20, -13, -6],
            [-14, -15, -2, -5, -1, -10, -20, -22],
            [-30, -6, -13, -11, -16, -11, -16, -27],
            [-36, -18, 0, -19, -15, -15, -21, -38],
            [-39, -30, -31, -13, -31, -36, -34, -42]
        ],
        'k': [
            [4, 54, 47, -99, -99, 60, 83, -62],
            [-32, 10, 55, 56, 56, 55, 10, 3],
            [-62, 12, -57, 44, -67, 28, 37, -31],
            [-55, 50, 11, -4, -19, 13, 0, -49],
            [-55, -43, -52, -28, -51, -47, -8, -50],
            [-47, -42, -43, -79, -64, -32, -29, -32],
            [-4, 3, -14, -50, -57, -18, 13, 4],
            [17, 30, -3, -14, 6, -1, 40, 18]
        ],

        // Endgame King Table
        'k_e': [
            [-50, -40, -30, -20, -20, -30, -40, -50],
            [-30, -20, -10, 0, 0, -10, -20, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -30, 0, 0, 0, 0, -30, -30],
            [-50, -30, -30, -30, -30, -30, -30, -50]
        ]
    };
    var pst_b = {
        'p': pst_w['p'].slice().reverse(),
        'n': pst_w['n'].slice().reverse(),
        'b': pst_w['b'].slice().reverse(),
        'r': pst_w['r'].slice().reverse(),
        'q': pst_w['q'].slice().reverse(),
        'k': pst_w['k'].slice().reverse(),
        'k_e': pst_w['k_e'].slice().reverse()
    }
    var pstOpponent = { 'w': pst_b, 'b': pst_w };
    var pstSelf = { 'w': pst_w, 'b': pst_b };
    var boardfiles = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
    var evaluateBoard = function (newmove, prevSum, newgame, newcolour) {
        var move = newmove;
        var game = newgame;
        var colour = newcolour;
        var from = [8 - parseInt(move.from[1]), boardfiles[move.from[0]]];
        var to = [8 - parseInt(move.to[1]), boardfiles[move.to[0]]];
        var rtv = prevSum;
        if (move.captured) {
            if (move.color == colour) {
                rtv += (weights[move.captured] + pstOpponent[move.color][move.captured][to[0]][to[1]]);
            } else {
                rtv -= (weights[move.captured] + pstSelf[move.color][move.captured][to[0]][to[1]]);
            }
        }
        if (move.flags.includes("p")) {
            if (move.color = colour) {
                rtv -= (weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]]);
                rtv += (weights[move.promotion] + pstOpponent[move.color][move.promotion][to[0]][to[1]]);
            } else {
                rtv += (weights[move.piece] + pstOpponent[move.color][move.piece][from[0]][from[1]]);
                rtv -= (weights[move.promotion] + pstSelf[move.color][move.promotion][to[0]][to[1]]);
            }
        } else {
            if (move.color != colour) {
                rtv += pstSelf[move.color][move.piece][from[0]][from[1]];
                rtv -= pstSelf[move.color][move.piece][to[0]][to[1]];
            } else {
                rtv -= pstSelf[move.color][move.piece][from[0]][from[1]];
                rtv += pstSelf[move.color][move.piece][to[0]][to[1]];
            }
        }
        return rtv;
    }
    evaluateBoardmodule['weights'] = weights;
    evaluateBoardmodule['pst_w'] = pst_w;
    evaluateBoardmodule['pst_b'] = pst_b;
    evaluateBoardmodule['pstOpponent'] = pstOpponent;
    evaluateBoardmodule['pstSelf'] = pstSelf;
    evaluateBoardmodule['boardfiles'] = boardfiles;
    function evaluateBoard(board, game, colour, isopening) {
        var totalEvaluation = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
            }
        }
        if (isopening) {
            totalEvaluation = myChessBot.evaluateBoard.opening.calculate(board, game, totalEvaluation, 3, colour);
        }
        return totalEvaluation;
    }

    var pawnEvalWhite =
        [
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
            [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
            [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
            [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
            [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
            [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        ];

    var pawnEvalBlack = pawnEvalWhite.slice().reverse();

    var knightEval =
        [
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
            [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
            [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
            [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
            [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
            [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
            [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
        ];

    var bishopEvalWhite = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ];

    var bishopEvalBlack = bishopEvalWhite.slice().reverse();

    var rookEvalWhite = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
    ];

    var rookEvalBlack = rookEvalWhite.slice().reverse();

    var evalQueen = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];

    var kingEvalWhite = [

        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
        [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
        [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
        [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
    ];

    var kingEvalBlack = kingEvalWhite.slice().reverse();

    function getPieceValue(piece, x, y) {
        if (piece === null) {
            return 0;
        }
        function getAbsoluteValue(piece, isWhite, x, y) {
            if (piece.type === 'p') {
                return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
            } else if (piece.type === 'r') {
                return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
            } else if (piece.type === 'n') {
                return 30 + knightEval[y][x];
            } else if (piece.type === 'b') {
                return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
            } else if (piece.type === 'q') {
                return 90 + evalQueen[y][x];
            } else if (piece.type === 'k') {
                return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
            }
            throw "Unknown piece type: " + piece.type;
        }
        var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
        return piece.color === 'w' ? absoluteValue : -absoluteValue;
    }
    */

    var weights = { p: 100, n: 280, b: 320, r: 479, q: 929, k: 60000, k_e: 60000 };
    var pst_w = {
        p: [
            [100, 100, 100, 100, 105, 100, 100, 100],
            [78, 83, 86, 73, 102, 82, 85, 90],
            [7, 29, 21, 44, 40, 31, 44, 7],
            [-17, 16, -2, 15, 14, 0, 15, -13],
            [-26, 3, 10, 9, 6, 1, 0, -23],
            [-22, 9, 5, -11, -10, -2, 3, -19],
            [-31, 8, -7, -37, -36, -14, 3, -31],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        n: [
            [-66, -53, -75, -75, -10, -55, -58, -70],
            [-3, -6, 100, -36, 4, 62, -4, -14],
            [10, 67, 1, 74, 73, 27, 62, -2],
            [24, 24, 45, 37, 33, 41, 25, 17],
            [-1, 5, 31, 21, 22, 35, 2, 0],
            [-18, 10, 13, 22, 18, 15, 11, -14],
            [-23, -15, 2, 0, 2, 0, -23, -20],
            [-74, -23, -26, -24, -19, -35, -22, -69],
        ],
        b: [
            [-59, -78, -82, -76, -23, -107, -37, -50],
            [-11, 20, 35, -42, -39, 31, 2, -22],
            [-9, 39, -32, 41, 52, -10, 28, -14],
            [25, 17, 20, 34, 26, 25, 15, 10],
            [13, 10, 17, 23, 17, 16, 0, 7],
            [14, 25, 24, 15, 8, 25, 20, 15],
            [19, 20, 11, 6, 7, 6, 20, 16],
            [-7, 2, -15, -12, -14, -15, -10, -10],
        ],
        r: [
            [35, 29, 33, 4, 37, 33, 56, 50],
            [55, 29, 56, 67, 55, 62, 34, 60],
            [19, 35, 28, 33, 45, 27, 25, 15],
            [0, 5, 16, 13, 18, -4, -9, -6],
            [-28, -35, -16, -21, -13, -29, -46, -30],
            [-42, -28, -42, -25, -25, -35, -26, -46],
            [-53, -38, -31, -26, -29, -43, -44, -53],
            [-30, -24, -18, 5, -2, -18, -31, -32],
        ],
        q: [
            [6, 1, -8, -104, 69, 24, 88, 26],
            [14, 32, 60, -10, 20, 76, 57, 24],
            [-2, 43, 32, 60, 72, 63, 43, 2],
            [1, -16, 22, 17, 25, 20, -13, -6],
            [-14, -15, -2, -5, -1, -10, -20, -22],
            [-30, -6, -13, -11, -16, -11, -16, -27],
            [-36, -18, 0, -19, -15, -15, -21, -38],
            [-39, -30, -31, -13, -31, -36, -34, -42],
        ],
        k: [
            [4, 54, 47, -99, -99, 60, 83, -62],
            [-32, 10, 55, 56, 56, 55, 10, 3],
            [-62, 12, -57, 44, -67, 28, 37, -31],
            [-55, 50, 11, -4, -19, 13, 0, -49],
            [-55, -43, -52, -28, -51, -47, -8, -50],
            [-47, -42, -43, -79, -64, -32, -29, -32],
            [-4, 3, -14, -50, -57, -18, 13, 4],
            [17, 30, -3, -14, 6, -1, 40, 18],
        ],

        // Endgame King Table
        k_e: [
            [-50, -40, -30, -20, -20, -30, -40, -50],
            [-30, -20, -10, 0, 0, -10, -20, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -30, 0, 0, 0, 0, -30, -30],
            [-50, -30, -30, -30, -30, -30, -30, -50],
        ],
    };
    var pst_b = {
        p: pst_w['p'].slice().reverse(),
        n: pst_w['n'].slice().reverse(),
        b: pst_w['b'].slice().reverse(),
        r: pst_w['r'].slice().reverse(),
        q: pst_w['q'].slice().reverse(),
        k: pst_w['k'].slice().reverse(),
        k_e: pst_w['k_e'].slice().reverse(),
    };

    var pstOpponent = { w: pst_b, b: pst_w };
    var pstSelf = { w: pst_w, b: pst_b };

    /*
     * Evaluates the board at this point in time,
     * using the material weights and piece square tables.
     */
    function evaluateBoard(game, move, prevSum, color) {

        if (game.in_checkmate()) {

            // Opponent is in checkmate (good for us)
            if (move.color === color) {
                return 10 ** 10;
            }
            // Our king's in checkmate (bad for us)
            else {
                return -(10 ** 10);
            }
        }

        if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate()) {
            return 0;
        }

        if (game.in_check()) {
            // Opponent is in check (good for us)
            if (move.color === color) {
                prevSum += 50;
            }
            // Our king's in check (bad for us)
            else {
                prevSum -= 50;
            }
        }

        var from = [
            8 - parseInt(move.from[1]),
            move.from.charCodeAt(0) - 'a'.charCodeAt(0),
        ];
        var to = [
            8 - parseInt(move.to[1]),
            move.to.charCodeAt(0) - 'a'.charCodeAt(0),
        ];

        // Change endgame behavior for kings
        if (prevSum < -1500) {
            if (move.piece === 'k') {
                move.piece = 'k_e';
            }
            // Kings can never be captured
            // else if (move.captured === 'k') {
            //   move.captured = 'k_e';
            // }
        }

        if ('captured' in move) {
            // Opponent piece was captured (good for us)
            if (move.color === color) {
                prevSum +=
                    weights[move.captured] +
                    pstOpponent[move.color][move.captured][to[0]][to[1]];
            }
            // Our piece was captured (bad for us)
            else {
                prevSum -=
                    weights[move.captured] +
                    pstSelf[move.color][move.captured][to[0]][to[1]];
            }
        }

        if (move.flags.includes('p')) {
            // NOTE: promote to queen for simplicity
            move.promotion = 'q';

            // Our piece was promoted (good for us)
            if (move.color === color) {
                prevSum -=
                    weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum +=
                    weights[move.promotion] +
                    pstSelf[move.color][move.promotion][to[0]][to[1]];
            }
            // Opponent piece was promoted (bad for us)
            else {
                prevSum +=
                    weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum -=
                    weights[move.promotion] +
                    pstSelf[move.color][move.promotion][to[0]][to[1]];
            }
        } else {
            // The moved piece still exists on the updated board, so we only need to update the position value
            if (move.color !== color) {
                prevSum += pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum -= pstSelf[move.color][move.piece][to[0]][to[1]];
            } else {
                prevSum -= pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum += pstSelf[move.color][move.piece][to[0]][to[1]];
            }
        }

        return prevSum;
    }

    /*
     * Performs the minimax algorithm to choose the best move: https://en.wikipedia.org/wiki/Minimax (pseudocode provided)
     * Recursively explores all possible moves up to a given depth, and evaluates the game board at the leaves.
     *
     * Basic idea: maximize the minimum value of the position resulting from the opponent's possible following moves.
     * Optimization: alpha-beta pruning: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning (pseudocode provided)
     *
     * Inputs:
     *  - game:                 the game object.
     *  - depth:                the depth of the recursive tree of all possible moves (i.e. height limit).
     *  - isMaximizingPlayer:   true if the current layer is maximizing, false otherwise.
     *  - sum:                  the sum (evaluation) so far at the current layer.
     *  - color:                the color of the current player.
     *
     * Output:
     *  the best move at the root of the current subtree.
     */
    evaluateBoardmodule['evaluateBoard'] = evaluateBoard;
    return evaluateBoardmodule;
}, globalThis, globalThis['myChessBot']);