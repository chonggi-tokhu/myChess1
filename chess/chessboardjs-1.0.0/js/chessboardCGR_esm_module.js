var Chessboard = (function (func, win) {
    return func(win);
})(function (window) {

    var COLUMNS = 'abcdefgh'.split('')
    function isString(str) {
        if (typeof str == "string") {
            return true
        }
        return false
    }
    function validFen(fen) {
        if (!isString(fen)) return false

        // cut off any move, castling, etc info from the end
        // we're only interested in position information
        fen = fen.replace(/ .+$/, '')

        // expand the empty square numbers to just 1s
        fen = expandFenEmptySquares(fen)

        // FEN should be 8 sections separated by slashes
        var chunks = fen.split('/')
        if (chunks.length !== 8) return false

        // check each section
        for (var i = 0; i < 8; i++) {
            if (chunks[i].length !== 8 ||
                chunks[i].search(/[^kqrnbpKQRNBP1]/) !== -1) {
                return false
            }
        }

        return true
    }
    function fenToObj(fen) {
        if (!validFen(fen)) return false

        // cut off any move, castling, etc info from the end
        // we're only interested in position information
        fen = fen.replace(/ .+$/, '')

        var rows = fen.split('/')
        var position = {}

        var currentRow = 8
        for (var i = 0; i < 8; i++) {
            var row = rows[i].split('')
            var colIdx = 0

            // loop through each character in the FEN section
            for (var j = 0; j < row.length; j++) {
                // number / empty squares
                if (row[j].search(/[1-8]/) !== -1) {
                    var numEmptySquares = parseInt(row[j], 10)
                    colIdx = colIdx + numEmptySquares
                } else {
                    // piece
                    var square = COLUMNS[colIdx] + currentRow
                    position[square] = fenToPieceCode(row[j])
                    colIdx = colIdx + 1
                }
            }

            currentRow = currentRow - 1
        }

        return position
    }

    // position object to FEN string
    // returns false if the obj is not a valid position object
    function objToFen(obj) {
        if (!validPositionObject(obj)) return false

        var fen = ''

        var currentRow = 8
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = COLUMNS[j] + currentRow

                // piece exists
                if (obj.hasOwnProperty(square)) {
                    fen = fen + pieceCodeToFen(obj[square])
                } else {
                    // empty space
                    fen = fen + '1'
                }
            }

            if (i !== 7) {
                fen = fen + '/'
            }

            currentRow = currentRow - 1
        }

        // squeeze the empty numbers together
        fen = squeezeFenEmptySquares(fen)

        return fen
    }
    HTMLElement.prototype.getElementsByAttrValue = function (attr, value) {
        var rtv = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getAttribute(attr) == value) {
                rtv[rtv.length] = this.children[i];
            }
        }
    }
    Document.prototype.getElementsByAttrValue = function (attr, value) {
        var rtv = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getAttribute(attr) == value) {
                rtv[rtv.length] = this.children[i];
            }
        }
    }
    var document = new Document();
    function fenToPieceCode(piece) {
        // black piece
        if (piece.toLowerCase() === piece) {
            return 'b' + piece.toUpperCase()
        }

        // white piece
        return 'w' + piece.toUpperCase()
    }

    // convert bP, wK, etc code to FEN structure
    function pieceCodeToFen(piece) {
        var pieceCodeLetters = piece.split('')

        // white piece
        if (pieceCodeLetters[0] === 'w') {
            return pieceCodeLetters[1].toUpperCase()
        }

        // black piece
        return pieceCodeLetters[1].toLowerCase()
    }

    function makehtml(fen, boardel) {
        var myfen = fenToObj(fen);
        if (boardel instanceof HTMLElement) {
            boardel.innerHTML = `<div class="Chessboard">
            <div class="rank">
            <div class="square file light" data-square="a8">
            </div>
            <div class="square file dark" data-square="b8">
            </div>
            <div class="square file light" data-square="c8">
            </div>
            <div class="square file dark" data-square="d8">
            </div>
            <div class="square file light" data-square="e8">
            </div>
            <div class="square file dark" data-square="f8">
            </div>
            <div class="square file light" data-square="g8">
            </div>
            <div class="square file dark" data-square="h8">
            </div>



            </div>


            <div class="rank">
            <div class="square file dark" data-square="a7">
            </div>
            <div class="square file light" data-square="b7">
            </div>
            <div class="square file dark" data-square="c7">
            </div>
            <div class="square file light" data-square="d7">
            </div>
            <div class="square file dark" data-square="e7">
            </div>
            <div class="square file light" data-square="f7">
            </div>
            <div class="square file dark" data-square="g7">
            </div>
            <div class="square file light" data-square="h7">
            </div>
            </div>


            <div class="rank">
            <div class="square file light" data-square="a6">
            </div>
            <div class="square file dark" data-square="b6">
            </div>
            <div class="square file light" data-square="c6">
            </div>
            <div class="square file dark" data-square="d6">
            </div>
            <div class="square file light" data-square="e6">
            </div>
            <div class="square file dark" data-square="f6">
            </div>
            <div class="square file light" data-square="g6">
            </div>
            <div class="square file dark" data-square="h6">
            </div>
            </div>
            

            <div class="rank">
            <div class="square file dark" data-square="a5">
            </div>
            <div class="square file light" data-square="b5">
            </div>
            <div class="square file dark" data-square="c5">
            </div>
            <div class="square file light" data-square="d5">
            </div>
            <div class="square file dark" data-square="e5">
            </div>
            <div class="square file light" data-square="f5">
            </div>
            <div class="square file dark" data-square="g5">
            </div>
            <div class="square file light" data-square="h5">
            </div>
            </div>

            <div class="rank">
            <div class="square file light" data-square="a4">
            </div>
            <div class="square file dark" data-square="b4">
            </div>
            <div class="square file light" data-square="c4">
            </div>
            <div class="square file dark" data-square="d4">
            </div>
            <div class="square file light" data-square="e4">
            </div>
            <div class="square file dark" data-square="f4">
            </div>
            <div class="square file light" data-square="g4">
            </div>
            <div class="square file dark" data-square="h4">
            </div>
            </div>

            <div class="rank">
            <div class="square file dark" data-square="a3">
            </div>
            <div class="square file light" data-square="b3">
            </div>
            <div class="square file dark" data-square="c3">
            </div>
            <div class="square file light" data-square="d3">
            </div>
            <div class="square file dark" data-square="e3">
            </div>
            <div class="square file light" data-square="f3">
            </div>
            <div class="square file dark" data-square="g3">
            </div>
            <div class="square file light" data-square="h3">
            </div>
            </div>

            <div class="rank">
            <div class="square file light" data-square="a2">
            </div>
            <div class="square file dark" data-square="b2">
            </div>
            <div class="square file light" data-square="c2">
            </div>
            <div class="square file dark" data-square="d2">
            </div>
            <div class="square file light" data-square="e2">
            </div>
            <div class="square file dark" data-square="f2">
            </div>
            <div class="square file light" data-square="g2">
            </div>
            <div class="square file dark" data-square="h2">
            </div>
            </div>

            <div class="rank">
            <div class="square file dark" data-square="a1">
            </div>
            <div class="square file light" data-square="b1">
            </div>
            <div class="square file dark" data-square="c1">
            </div>
            <div class="square file light" data-square="d1">
            </div>
            <div class="square file dark" data-square="e1">
            </div>
            <div class="square file light" data-square="f1">
            </div>
            <div class="square file dark" data-square="g1">
            </div>
            <div class="square file light" data-square="h1">
            </div>
            </div>
            </div>`;
        }
        return boardel;
    }
    function expandFenEmptySquares(fen) {
        return fen.replace(/8/g, '11111111')
            .replace(/7/g, '1111111')
            .replace(/6/g, '111111')
            .replace(/5/g, '11111')
            .replace(/4/g, '1111')
            .replace(/3/g, '111')
            .replace(/2/g, '11')
    }

    function myclass(el, config) {
        this.el = (typeof el == "string") ? document.getElementById(el) : (el instanceof HTMLElement) ? el : (function () { alert("aaaaaa"); return false })();
        this.config = config;
        this.board = makehtml(this.config.position, this.el);
        this.position(this.config.position);
    }
    function isupperCase(string) {
        if (typeof string == "string") {
            if (string.length == 1) {
                if (string.toUpperCase() == string) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
        return false;
    }
    myclass.prototype = {
        position(fen) {
            var thisobj = this;
            var myfen = fenToObj(fen);
            var draggable = (this.config.draggable) ? this.config.draggable : false;
            this.board.querySelectorAll("div.square").forEach(function (val, idx, arr) {
                val.innerHTML = `<img src="${thisobj.config.piece(myfen[val.getAttribute("data-square")])}" class="piece" data-piece="${myfen[val.getAttribute("data-square")]}" draggable="${draggable}">`;
                val.addEventListener("drop", function (ev) {
                    var newel = ev.dataTransfer.getData("mysq");
                    var neweldata = ev.dataTransfer.getData("square");
                    var newelhtml = ev.dataTransfer.getData("html");
                    if (this.children.length > 0) {
                        if (newelhtml) {
                            val.innerHTML = newelhtml;
                            thisobj.animate(this.children.item(0), "kill", { opacity: 1 }, { opacity: 0 });
                            this.children.item(0).remove();
                        }
                    } else {
                        val.innerHTML = newelhtml;
                    }
                });
            });
            this.board.querySelectorAll("div.square img.piece").forEach(function (val, idx, arr) {
                val.addEventListener("dragstart", function (ev) {
                    ev.dataTransfer.setData("mysq", JSON.stringify(val));
                    ev.dataTransfer.setData("html", val.outerHTML);
                    ev.dataTransfer.setData("square", val.parentElement.getAttribute("data-square"));
                });
                val.addEventListener("drop", function (ev) {
                    var newel = ev.dataTransfer.getData("mysq");
                    ev.target.parentElement.appendChild(document.getElementsByAttrValue("data-square", newel)[0]);
                    thisobj.animate(ev.target, "kill", { opacity: 1 }, { opacity: 0 });
                    this.remove();
                });
            });
            this.board.querySelectorAll("div.Chessboard")[0].addEventListener("dragstart", function (ev) {
                ev.preventDefault();
            });
            this.board.querySelectorAll("div.Chessboard")[0].addEventListener("dragover", function (ev) {
                ev.preventDefault();
            });
        },
        animate(pieceEl, opt, ...type) {
            if (pieceEl instanceof HTMLElement && typeof type == "object" && typeof this.config.pieceAnimationTime == "number") {
                if (opt == "move") {
                    if (pieceEl.tagName == "img") {
                        var newpieceElpr = document.createElement("img");
                        newpieceElpr.outerHTML = pieceEl.outerHTML;
                        var newpieceEl = document.body.appendChild(newpieceElpr);
                        newpieceEl.animate(type, { duration: this.config.pieceAnimationTime, iterations: 1, easing: 'ease-in-out', });
                        setTimeout(function () { newpieceEl.remove() }, this.config.pieceAnimationTime);
                        return { message: "new image was created and animated then removed", piece: pieceEl };
                    } else {
                        return false;
                    }
                } else if (opt == "kill") {
                    if (pieceEl.tagName == "img") {
                        pieceEl.animate(type, { duration: this.config.pieceAnimationTime, iterations: 1, easing: 'ease-in-out', });
                        setTimeout(function () { pieceEl.remove() }, this.config.pieceAnimationTime);
                        return { message: "image was animated then removed", piece: pieceEl };
                    } else {
                        return false;
                    }
                } else if (opt == "put") {
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        isupperCase: isupperCase,
        makehtml: makehtml,
        pieceCodeToFen: pieceCodeToFen,
        fenToPieceCode: fenToPieceCode,
        fenToObj: fenToObj,
        objToFen: objToFen,
    }
    return myclass;
}, window);
export { Chessboard };