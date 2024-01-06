import { Chess } from "./chess.js";
import { Chessboard } from "./chessboardjs-1.0.0/js/chessboard-1.0.0_esm.js";
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
var config = {};
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
                var board0 = new ChessboardGame(new Chess(config.position), Chessboard(el, config));
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param; })(boards[boards.length - 1]);
            });
        } else if (elSelectorP == "id" || elSelectorP == "#") {
            var config = new configparam();
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            var board0 = new ChessboardGame(new Chess(config.position), Chessboard(elp, config));
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
                var board0 = new ChessboardGame(new Chess(config.position), Chessboard(el, config));
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param })(boards[boards.length - 1]);
            });
        } else {
            var config = new configparam();
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            var board0 = new ChessboardGame(new Chess(config.position), Chessboard(elp, config));
            boards[boards.length] = board0;
            namedboards[board0] = boards[boards.length - 1];
        }
        return { boards: boards, namedboards: namedboards, };
    } else {
        return false;
    }
}
window['autochessmodules']['autochess'] = autochess;
window['autochessmodules']['ChessboardGame'] = ChessboardGame;
window['autochessmodules']['boards'] = boards;
window['autochessmodules']['CompleteLoadingBoard'] = CompleteLoadingBoard;
window['autochessmodules']['namedboards'] = namedboards;
window['autochessmodules']['Chess'] = Chess;
window['autochessmodules']['Chessboard'] = Chessboard;
var docChess = window['autochessmodules'];
window.addEventListener("CompleteLoadingBoard", function (evparam) {
    evparam
});