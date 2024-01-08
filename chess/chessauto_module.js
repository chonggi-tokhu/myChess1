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
    ondragstart: function (ev) {
        ev.dataTransfer.setData("mysq", JSON.stringify(val));
        ev.dataTransfer.setData("html", val.outerHTML);
        ev.dataTransfer.setData("square", val.parentElement.getAttribute("data-square"));
    },
    ondrop: function (ev) {
        var newel = ev.dataTransfer.getData("mysq");
        ev.target.parentElement.appendChild(this.board.getElementsByAttrValue("data-square", newel)[0]);
        thisobj.animate(ev.target, "kill", { opacity: 1 }, { opacity: 0 });
        this.remove();
    },
    ondragover: function (ev) {
        ev.preventDefault();
    },
    ondroponsquare: function (ev) {
        var newel = ev.dataTransfer.getData("mysq");
        var neweldata = ev.dataTransfer.getData("square");
        var newelhtml = ev.dataTransfer.getData("html");
        if (this.children.length > 0) {
            if (newelhtml) {
                val.appendChild(thisobj.board.getElementsByAttrValue("data-square", neweldata)[0].getElementsByTagName("img")[0]);
                thisobj.animate(this.children.item(0), "kill", { opacity: 1 }, { opacity: 0 });
                this.children.item(0).remove();
            }
        } else {
            val.appendChild(thisobj.board.getElementsByAttrValue("data-square", neweldata)[0].getElementsByTagName("img")[0]);
        }
    },
    eventfunc(thisobj, rule, fen) {
        var myfen = thisobj.fenToObj(fen);
        var draggable = (thisobj.config.draggable) ? thisobj.config.draggable : false;
        thisobj.board.querySelectorAll("div.rank div.square").forEach(function (val, idx, arr) {
            val.innerHTML = (!myfen[val.getAttribute("data-square")] || myfen[val.getAttribute("data-square")] == undefined) ? '' : `<img src="${thisobj.config.piece(myfen[val.getAttribute("data-square")])}" class="piece" data-piece="${myfen[val.getAttribute("data-square")]}" draggable="${draggable}">`;
            val.addEventListener("drop", function (ev) {
                var newel = ev.dataTransfer.getData("mysq");
                var neweldata = ev.dataTransfer.getData("square");
                var newelhtml = ev.dataTransfer.getData("html");
                var iscastling = (function (param1, param2) { return (myfen[neweldata] == "wK" || myfen[neweldata] == "bK") && ((((param1 == "e1" && param2 == "g1") || (param1 == "e8" && param2 == "g8"))) || ((param1 == "e1" && param2 == "c1") || (param1 == "e8" && param2 == "c8"))) })(neweldata, ev.target.getAttribute("data-square"));
                var mymove = (!iscastling) ? rule.move({
                    from: neweldata,
                    to: ev.target.getAttribute("data-square"),
                    promotion: 'q',
                }) : rule.move((function (param1, param2) { if ((param1 == "e1" && param2 == "g1") || (param1 == "e8" && param2 == "g8")) { return "O-O" } else if ((param1 == "e1" && param2 == "c1") || (param1 == "e8" && param2 == "c8")) { return "O-O-O" } else { return null; } })(neweldata, ev.target.getAttribute("data-square")));
                if (mymove === null) {
                    if (iscastling) {
                        console.log((function (param1, param2) { if ((param1 == "e1" && param2 == "g1") || (param1 == "e8" && param2 == "g8")) { return "O-O" } else if ((param1 == "e1" && param2 == "c1") || (param1 == "e8" && param2 == "c8")) { return "O-O-O" } else { return null; } })(neweldata, ev.target.getAttribute("data-square")));
                    }
                    console.log(mymove);
                    return 'snapback';
                }
                if (mymove.san && mymove.to) {
                    console.log(mymove.san.split("x")[1]);
                    if (mymove.captured == 'p' && mymove.piece == "p") {

                        if (mymove.color == "w") {

                            var enpasantpiece = mymove.to.replace(mymove.to.split("")[1], Number(mymove.to.split("")[1]) - 1);
                            if (thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img").length > 0) {
                                console.log("en pasant");
                                thisobj.animate(thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img")[0], "kill", { opacity: 1 }, { opacity: 0 });
                                thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img")[0].remove();
                            }

                        } else {
                            var enpasantpiece = mymove.to.replace(mymove.to.split("")[1], Number(mymove.to.split("")[1]) + 1);
                            if (thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img").length > 0) {
                                console.log("en pasant");
                                thisobj.animate(thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img")[0], "kill", { opacity: 1 }, { opacity: 0 });
                                thisobj.board.getElementsByAttrValue("data-square", enpasantpiece)[0].getElementsByTagName("img")[0].remove();
                            }
                        }
                    }
                }

                if (this.children.length > 0) {
                    if (newelhtml) {
                        val.appendChild(thisobj.board.getElementsByAttrValue("data-square", neweldata)[0].getElementsByTagName("img")[0]);
                        thisobj.animate(this.children.item(0), "kill", { opacity: 1 }, { opacity: 0 });
                        this.children.item(0).remove();
                    }
                } else {
                    val.appendChild(thisobj.board.getElementsByAttrValue("data-square", neweldata)[0].getElementsByTagName("img")[0]);
                    if (iscastling) {
                        if ((function (param1, param2) { if ((param1 == "e1" && param2 == "g1") || (param1 == "e8" && param2 == "g8")) { return "O-O" } else if ((param1 == "e1" && param2 == "c1") || (param1 == "e8" && param2 == "c8")) { return "O-O-O" } else { return null; } })(neweldata, ev.target.getAttribute("data-square")) == "O-O") {
                            if (neweldata == "e1") {
                                thisobj.board.getElementsByAttrValue("data-square", "f1")[0].appendChild(thisobj.board.getElementsByAttrValue("data-square", "h1")[0].getElementsByTagName("img")[0]);
                            } else if (neweldata == "e8") {
                                thisobj.board.getElementsByAttrValue("data-square", "f8")[0].appendChild(thisobj.board.getElementsByAttrValue("data-square", "h8")[0].getElementsByTagName("img")[0]);
                            }
                        } else if ((function (param1, param2) { if ((param1 == "e1" && param2 == "g1") || (param1 == "e8" && param2 == "g8")) { return "O-O" } else if ((param1 == "e1" && param2 == "c1") || (param1 == "e8" && param2 == "c8")) { return "O-O-O" } else { return null; } })(neweldata, ev.target.getAttribute("data-square")) == "O-O-O") {
                            if (neweldata == "e1") {
                                thisobj.board.getElementsByAttrValue("data-square", "d1")[0].appendChild(thisobj.board.getElementsByAttrValue("data-square", "a1")[0].getElementsByTagName("img")[0]);
                            } else if (neweldata == "e8") {
                                thisobj.board.getElementsByAttrValue("data-square", "d8")[0].appendChild(thisobj.board.getElementsByAttrValue("data-square", "a8")[0].getElementsByTagName("img")[0]);
                            }
                        }
                    }
                }
            });
        });
        thisobj.board.querySelectorAll("div.square img.piece").forEach(function (val, idx, arr) {
            if (val.style) {
                if (typeof val.style.setProperty == "function" && val.offsetWidth && val.offsetHeight) {
                    val.style.setProperty("--pieceheight-2", val.offsetHeight + "px");
                    val.style.setProperty("--piecewidth-2", val.offsetWidth + "px");
                }
            }
            val.addEventListener("dragstart", function (ev) {
                ev.dataTransfer.setData("mysq", JSON.stringify(val));
                ev.dataTransfer.setData("html", val.outerHTML);
                ev.dataTransfer.setData("square", val.parentElement.getAttribute("data-square"));
            });
            val.addEventListener("drop", function (ev) {
                var newel = ev.dataTransfer.getData("mysq");
                var neweldata = ev.dataTransfer.getData("square");
                var mymove = rule.move({
                    from: neweldata,
                    to: ev.target.parentElement.getAttribute("data-square"),
                    promotion: 'q',
                });
                if (mymove === null) {
                    console.log(mymove);
                    return 'snapback';
                }
                ev.target.parentElement.appendChild(thisobj.board.getElementsByAttrValue("data-square", neweldata)[0].getElementsByTagName("img")[0]);
                thisobj.animate(ev.target, "kill", { opacity: 1 }, { opacity: 0 });
                this.remove();
            });
        });
        thisobj.board.querySelectorAll("div.Chessboard")[0].addEventListener("dragover", function (ev) {
            ev.preventDefault();
        });
    }
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
    update(isauto) {
        this.board.position(this.game.fen(), isauto);
    }
    updateStatus(isauto) {
        this.update(isauto);
    }
    moveandupdatemanual(move, cb) {
        var newmove = this.game.move(move);
        this.updateStatus(false);
        if (typeof cb == "function") {
            cb(this.game, this.board, newmove);
        } else {
            return { game: this.game, board: this.board, move: newmove, fen: this.game.fen(), pgn: this.game.pgn, san: (typeof move == "string") ? move : newmove.san, };
        }
    }

    moveandupdate(move, isauto, cb) {
        var newmove = this.game.move(move);
        this.updateStatus(isauto);
        if (typeof cb == "function") {
            cb(this.game, this.board, newmove);
        } else {
            return { game: this.game, board: this.board, move: newmove, fen: this.game.fen(), pgn: this.game.pgn, san: (typeof move == "string") ? move : newmove.san, };
        }
    }

    moveandupdateauto(move, cb) {
        var newmove = this.game.move(move);
        this.updateStatus(true);
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
    start() {
        this.board.config.eventfunc(this.board, this.game, this.game.fen());
    }
}
function autochess(elp, elSelectorP, parel, configparam) {

    if (typeof elp == "string" && parel instanceof HTMLElement) {
        if (elSelectorP == "className" || elSelectorP == ".") {
            parel.querySelectorAll("." + elp).forEach(function (el, key, par) {
                var config = new configparam();
                (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
                var customconf = configobj;
                configobj.position = el.getAttribute("position");
                if (!el.hasAttribute("position")) {
                    configobj.position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
                }
                var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
                board0.game.load(board0.board.config.position);
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param; })(boards[boards.length - 1]);
            });
        } else if (elSelectorP == "id" || elSelectorP == "#") {
            var config = new configparam();
            var el = document.getElementById(elp);
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            configobj.position = el.getAttribute("position");
            if (!el.hasAttribute("position")) {
                configobj.position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            }
            var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
            board0.game.load(board0.board.config.position)
            config.set(board0.game, board0.board, document.getElementById(elp).getAttribute("position"));
            boards[boards.length] = board0;
            namedboards[elp] = (function (param) { return param; })(boards[0]);
        } else if (elSelectorP == "tagName" || elSelectorP == "") {
            parel.querySelectorAll(elp).forEach(function (el, key, par) {
                var config = new configparam();
                (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
                var customconf = configobj;
                configobj.position = el.getAttribute("position");
                if (!el.hasAttribute("position")) {
                    configobj.position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
                }

                var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
                board0.game.load(board0.board.config.position);
                boards[boards.length] = board0;
                namedboards[key] = (function (param) { return param })(boards[boards.length - 1]);
            });
        } else {
            var config = new configparam();
            (config.position == "start") ? config.position = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` : config.position = config.position;
            var el = document.getElementById(elp);
            configobj.position = el.getAttribute("position");
            if (!el.hasAttribute("position")) {
                configobj.position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            }
            var board0 = new ChessboardGame(new Chess(config.position), new Chessboard(el, configobj));
            board0.game.load(board0.board.config.position);
            config.set(board0.game, board0.board, document.getElementById(elp).getAttribute("position"));
            boards[boards.length] = board0;
            namedboards[board0] = boards[boards.length - 1];
        }
        boards.forEach(function (val, idx, arr) {
            val.start();
        })
        return { boards: boards, namedboards: namedboards, };
    } else {
        return false;
    }
}
var docChess = { autochess: autochess, ChessboardGame: ChessboardGame, boards: boards, CompleteLoadingBoard: CompleteLoadingBoard, namedboards: namedboards, Chess: Chess, Chessboard: Chessboard, config: config, configobj: configobj };
export { docChess };