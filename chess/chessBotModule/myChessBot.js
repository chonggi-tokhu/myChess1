var myChessBot = (function (win, module) {
    win['myChessBot'] = this;
    (typeof module === 'undefined') ? module = win['myChessBot'] : module = module;
    return this;
})(globalThis, globalThis['myChessBot']);