(function (ep, gth, module) {
    myChessBot = module;
    function pushfunc(mod, sth) {
        console.log(typeof sth);
        if (typeof sth == "object") {
            Object.keys(sth).forEach(function (val, idx, arr) {
                console.log(sth);
                mod[val] = sth[val];
                console.log(val);
                console.log(mod[val]);
            });
        }
        console.log(mod);
        return mod;
    }
    (typeof myChessBot !== 'undefined') ? pushfunc(myChessBot, ep(gth)) /*myChessBot.core = ep(gth)*/ : pushfunc(myChessBot, myChessBot);
})(function (win) {
    var core = win['myChessBot'].core;
    console.log(core);
    if (core.core) {
        return core.core;
    }
    return core;
}, globalThis, globalThis['myChessBot']);