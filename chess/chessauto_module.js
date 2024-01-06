import { Chess } from "./chess_cjs.js";
import { Chessboard } from "./chessboardjs-1.0.0/js/chessboardCGR_esm_module.js";
var game = null;
var board = null;
CustomEvent.prototype.changeprops = function (propname, valtochange) {
    this[propname] = valtochange;
}
var CompleteLoadingBoard = new CustomEvent("CompleteLoadingBoard", {
    detail: {
        complete: false,
    },
});
var boards = [];
var namedboards = {};
var game = new Chess();
var config = function (chess, board) {
    if (chess && board) {
        this.chess = chess;
        this.board = board;
    }

}
config.prototype = {
    set(chess, board, ...opts) {
        this.chess = chess;
        this.board = board;
        this.onDragStart = opts[1];
        this.onDrop = opts[2];
        this.onSnapEnd = opts[3];
        this.draggable = opts[4];
        this.position = opts[0];
        return this;
    },
    piece(piecename) { return "./chessboardjs-1.0.0/img/chesspieces/wikipedia/" + piecename + ".png"; },
    pieceAnimationTime: 800,
    onDragStart: function (source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (this.chess.game_over()) return false;

        // only pick up pieces for the side to move
        if ((this.chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (this.chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false
        }
    },
    onDrop: function (source, target) {
        // see if the move is legal
        var move = this.chess.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })

        // illegal move
        if (move === null) return 'snapback'
    },
    onSnapEnd: function () {
        this.board.position(game.fen())
    },
    position: 'start',
    draggable: true,
};
var configobj = {
    piece(piecename) { return "./chessboardjs-1.0.0/img/chesspieces/wikipedia/" + piecename + ".png"; },
    pieceAnimationTime: 800,
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    draggable: true,
}
class ChessboardGame {
    constructor(game, board) {
        this.game = game;
        this.board = board;
    }
    move(move, cb) {
        var newmove = this.game.move(move);
        cb(this.game, this.board, newmove);
    }
    update() {
        this.board.position(this.game.fen());
    }
    updateStatus() {
        this.update();
    }
    moveandupdate(move, cb) {
        var newmove = this.game.move(move);
        this.updateStatus();
        if (typeof cb == "function") {
            cb(this.game, this.board, newmove);
        } else {
            return { game: this.game, board: this.board, move: newmove, fen: this.game.fen(), pgn: this.game.pgn, san: (typeof move == "string") ? move : newmove.san, };
        }
    }
    undo(cb) {
        this.game.undo();
        this.updateStatus();
        if (typeof cb == "function") {
            cb(this.game, this.board);
        }
    }
    doasyouwant(cb) {
        if (typeof cb == "function") {
            cb(this.game, this.board);
        }
    }
    getfen() {
        return this.game.fen();
    }
    setfen(fen) {
        if (typeof fen == "string") {
            return this.game.load(fen);
        } else {
            return false;
        }
    }
    getmoves(sq, piece, opt) {
        if (sq) {
            return this.game.moves(sq);
        }
        if (piece) {
            return this.game.moves(piece);
        }
        if (opt) {
            return this.game.moves(opt);
        }
        return this.game.moves();
    }
}
function autochess(elp, elSelectorP, parel, configparam) {

    if (typeof elp == "string" && parel instanceof HTMLElement) {
        if (elSelectorP == "className" || elSelectorP == ".") {
            parel.querySelectorAll("." + elp).forEach(function (el, key, par) {
                var config = new configparam();
                (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
                var customconf = config;
                if (el.hasAttribute("position")) {
                    customconf.position = el.getAttribute("position");
                    config = customconf;
                }
                var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param; })(boards[boards.length - 1]);
            });
        } else if (elSelectorP == "id" || elSelectorP == "#") {
            var config = new configparam();
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(elp, configobj));
            config.set(board0.game, board0.board, document.getElementById(elp).getAttribute("position"));
            boards[boards.length] = board0;
            namedboards[elp] = (function (param) { return param; })(boards[0]);
        } else if (elSelectorP == "tagName" || elSelectorP == "") {
            parel.querySelectorAll(elp).forEach(function (el, key, par) {
                var config = new configparam();
                (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
                var customconf = config;
                if (el.hasAttribute("position")) {
                    customconf.position = el.getAttribute("position");
                    config = customconf;
                }
                var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param })(boards[boards.length - 1]);
            });
        } else {
            var config = new configparam();
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(elp, configobj));
            config.set(board0.game, board0.board, document.getElementById(elp).getAttribute("position"));
            boards[boards.length] = board0;
            namedboards[board0] = boards[boards.length - 1];
        }
        return { boards: boards, namedboards: namedboards, };
    } else {
        return false;
    }
}
var docChess = { autochess: autochess, ChessboardGame: ChessboardGame, boards: boards, CompleteLoadingBoard: CompleteLoadingBoard, namedboards: namedboards, Chess: Chess, Chessboard: Chessboard, config: config, };
export { docChess };