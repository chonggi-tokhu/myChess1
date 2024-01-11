(function (ep, gth, module) {
    myChessBot = module;
    function pushfunc(mod, sth) {
        if (typeof sth == "object") {
            Object.keys(sth).forEach(function (val, idx, arr) {
                mod[val] = sth[val];
            });
        }
        return mod;
    }
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.core === 'undefined') ? pushfunc(myChessBot, ep(gth)) /*myChessBot.core = ep(gth)*/ : pushfunc(myChessBot, myChessBot) : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var core = win['myChessBot'].core;
    return core;
}, globalThis, globalThis['myChessBot']);