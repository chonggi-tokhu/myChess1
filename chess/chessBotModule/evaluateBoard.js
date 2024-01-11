(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.evaluateBoard === 'undefined') ? myChessBot.evaluateBoard = ep(gth) : myChessBot.evaluateBoard = myChessBot.evaluateBoard : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var windowobj = win;
    var thismodule = windowobj['myChessBot'];
    var evaluateBoardmodule = {};

    var openings = {
        getOpeningByName(openingname) {
            var opname = new String(openingname);
            var rtv = { opening: null, index: null };
            this.named.forEach(function (val, idx, arr) {
                if (val.name == opname) {
                    rtv.opening = val;
                    rtv.index = val.idx;
                    return rtv;
                }
                if (val.otherNames.includes(opname)) {
                    rtv.opening = val;
                    rtv.index = val.idx;
                    return rtv;
                }
            });
            return rtv;
        },
        getOpeningByIndex(idxnumber) {
            var rtv = { opening: null, index: null };
            this.named.forEach(function (val, idx, arr) {
                if (val.idx == idxnumber) {
                    rtv.opening = val;
                    rtv.index = val.idx;
                    return rtv;
                }
            });
            return rtv;
        },
        named: [
            { name: `Starting Position`, move: [], idx: 0, fen: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`, otherNames: [] },
            { name: `King's Pawn Opening`, move: ['e4'], idx: 1, fen: `rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1`, otherNames: [] },
            { name: `Queen's Pawn Opening`, move: ['d4'], idx: 2, fen: `rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1`, otherNames: [] },
            { name: `Open Game`, move: ['e4', 'e5'], idx: 3, fen: `rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Closed game`, move: ['d4', 'd5'], idx: 4, fen: `rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Sicilian Defence`, move: ['e4', 'c5'], idx: 5, fen: `rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Indian Defence`, move: ['d4', 'Nf6'], idx: 6, fen: `rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2`, otherNames: [] },
            { name: `Caro-Kann Defence`, move: ['e4', 'c6'], idx: 7, fen: `rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Horwitz Defence`, move: ['d4', 'e6'], idx: 8, fen: `rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Scandinavian Defence`, move: ['e4', 'd5'], idx: 9, fen: `rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `French Defence`, move: ['e4', 'e6'], idx: 10, fen: `rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `Alekhine Defence`, move: ['e4', 'Nf6'], idx: 11, fen: `rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2`, otherNames: [] },
            { name: `Modern Defence`, move: ['e4', 'g6'], idx: 12, fen: `rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`, otherNames: [] },
            { name: `King's Knight Opening`, move: ['e4', 'e5', 'Nf3'], idx: 13, fen: `rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2`, otherNames: [] },
            { name: `Queen's Gambit`, move: ['d4', 'd5', 'c4'], idx: 14, fen: `rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2`, otherNames: [] },
            { name: `Queen's Gambit Declined`, move: ['d4', 'd5', 'c4', 'e6'], idx: 15, fen: `rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`, otherNames: [`QGD`] },
            { name: `King's Knight Opening Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6'], idx: 16, fen: `r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3`, otherNames: [] },
            { name: `Italian Game`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'], idx: 17, fen: `r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`, otherNames: [] },
            { name: `Ruy Lopéz`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'], idx: 18, fen: `r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`, otherNames: [] },
            { name: `Scotch Game`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'd4'], idx: 19, fen: `r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3`, otherNames: [] },
            { name: `Italian Game: Giuoco Piano Game`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'], idx: 20, fen: `r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4`, otherNames: [] },
            { name: `Italian Game: Giuoco Piano Game Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3'], idx: 21, fen: `r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4`, otherNames: [] },
            { name: `Italian Game: Giuoco Piano Game: Giuoco Pianissimo`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3'], idx: 22, fen: `r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4`, otherNames: [] },
            { name: `Italian Game: Giuoco Piano Game: Evans Gambit`, move: ['e4', 'e5', 'Nf3', 'Nc6', `Bc4`, 'Bc5', 'b4'], idx: 23, fen: `r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 4`, otherNames: [] },
            { name: `Italian Game: Giuoco Piano Game: Evans Gambit Accepted`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4'], idx: 24, fen: `r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6'], idx: 25, fen: `r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4`, otherNames: [] },
            { name: `Ruy Lopez: Berlin Defence`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6'], idx: 26, fen: `r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4`, otherNames: [] },
            { name: `Ruy Lopez: Berlin Defence: Main Line`, move: [`e4`, 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5', 'Nf5', 'Qxd8+', 'Kxd8'], idx: 27, fen: `r1bqkb1r/ppp2ppp/2p5/4Pn2/8/5N2/PPP2PPP/RNBQ1RK1 w kq - 1 8`, otherNames: [`l'Hermet Variation`] },
            { name: `Ruy Lopez: Morphy Defence: Columbus Variation`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4'], idx: 28, fen: `r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4`, otherNames: ['Ruy Lopez Morphy Defence Main Line'] },
            { name: `Ruy Lopez: Morphy Defence: Closed`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7'], idx: 29, fen: `r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence: Closed Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd6'], idx: 30, fen: `r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 b - - 0 9`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence: Closed: Marshall Attack`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'b5', 'Bb3', 'O-O', 'c3', 'd5'], idx: 31, fen: `r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence: Closed: Marshall Attack Main line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'b5', 'Bb3', 'O-O', 'c3', 'd5', 'exd5', 'Nxd5', 'Nxe5', 'Nxe5', 'Rxe5'], idx: 32, fen: `r1bq1rk1/2p1bppp/p7/1p1nR3/8/1BP5/PP1P1PPP/RNBQ2K1 b - - 0 11`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence: Open`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Nxe4'], idx: 33, fen: `r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6`, otherNames: [] },
            { name: `Ruy Lopez: Morphy Defence: Open Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Nxe4', 'd4', 'b5', 'Bb3', 'd5', 'dxe5', 'Be6'], idx: 34, fen: `r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1 w kq - 1 9`, otherNames: [] },
            { name: `King's Knight Opening: Damiano Defence`, move: ['e4', 'e5', 'Nf3', 'f6'], idx: 35, fen: `rnbqkbnr/pppp2pp/5p2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3`, otherNames: [] },
            { name: `Scotch Game: Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'], idx: 36, fen: `r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4`, otherNames: [] },
            { name: `Scotch Game: Classical Variation`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bc5', 'Be3'], idx: 37, fen: `r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/4B3/PPP2PPP/RN1QKB1R b KQkq - 2 5`, otherNames: [] },
            { name: `Scotch Game: Scotch Gambit`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Bc4'], idx: 38, fen: `r1bqkbnr/pppp1ppp/2n5/8/2BpP3/5N2/PPP2PPP/RNBQK2R b KQkq - 1 4`, otherNames: [] },
            { name: `Scotch Game: Scotch Gambit,Main Line`, move: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Bc4', 'Bc5'], idx: 39, fen: `r1bqk1nr/pppp1ppp/2n5/2b5/2BpP3/5N2/PPP2PPP/RNBQK2R w KQkq - 2 5`, otherNames: ['Scotch Gambit: Haxo Gambit'] },
            { name: `Queen's Gambit Declined: Normal Defence`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6'], idx: 40, fen: `rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4`, otherNames: [] },
            { name: `Queen's Gambit Declined: Main Line`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3'], idx: 41, fen: `rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQ - 2 6`, otherNames: ['QGD Main Line'] },
            { name: `Queen's Gambit Declined: Exchange Variation`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5'], idx: 42, fen: `rnbqkb1r/ppp2ppp/5n2/3p4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5`, otherNames: [`QGD Exchange`] },
            { name: `Queen's Gambit Declined: Three Knight's Variation`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Nf3'], idx: 43, fen: `rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4`, otherNames: [`QGD three knight`] },
            { name: `Queen's Gambit Declined: Three Knights, Ragozin Defence`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'Bb4'], idx: 44, fen: `rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 4 5`, otherNames: [`QGD Ragozin`] },
            { name: `Queen's Gambit Declined: Tarrasch Defence`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5'], idx: 45, fen: `rnbqkbnr/pp3ppp/4p3/2pp4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4`, otherNames: [`QGD tarrasch`] },
            { name: `Slav Defence`, move: ['d4', 'd5', 'c4', 'c6'], idx: 46, fen: `rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`, otherNames: [] },
            { name: `Semi-Slav Defence`, move: ['d4', 'd5', 'c4', 'e6', 'Nf3', 'Nf6', 'Nc3', 'c6'], idx: 47, fen: `rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5`, otherNames: [`Queen's Gambit Declined: Semi-Slav Defence`, `QGD semi slav`] },
            { name: `King's Indian Defence`, move: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6'], idx: 48, fen: `rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5`, otherNames: [`KID`] },
            { name: `Nimzo-Indian Defence`, move: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4'], idx: 49, fen: `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4`, otherNames: [] },
            { name: `Queen's Indian Defence`, move: ['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6'], idx: 50, fen: `rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4`, otherNames: [`QID`] },
            { name: `Queen's Gambit Declined: Main line, Tartakower Defence`, move: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'b6'], idx: 51, fen: `rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8`, otherNames: [`QGD Tartakower`] },
            { name: `Open Sicilian`, move: ['e4', 'c5', 'Nf3'], idx: 52, fen: `rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2`, otherNames: [`Sicilian Defence: Open Variation`] },
            { name: `Open Sicilian Main Line`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4'], idx: 53, fen: `rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4`, otherNames: [] },
            { name: `Open Sicilian: Dragon Variation`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6'], idx: 54, fen: `rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`, otherNames: [`Siclian Dragon`] },
            { name: `Open Sicilian: Najdorf Variation`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'], idx: 55, fen: `rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`, otherNames: [`Sicilian Najdorf`] },
            { name: `Sicilian Najdorf Main Line`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Bg5', 'e6', 'f4'], idx: 56, fen: `rnbqkb1r/1p3ppp/p2ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R b KQkq - 0 7`, otherNames: [] },
            { name: `Siclian Dragon Yugoslavian Attack`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'Qd2', 'O-O', 'f3'], idx: 57, fen: `rnbq1rk1/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R b KQ - 0 8`, otherNames: [`Sicilian Dragon: Yugoslav Attack`] },
            { name: `Siclian Defence: Classical Variation`, move: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'Nc6'], idx: 58, fen: `r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6`, otherNames: [`Closed Siclian`] },
            { name: `Accelerated London System-개막장 오프닝`, move: ['d4', 'd5', 'Bf4'], idx: 59, fen: `rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2`, otherNames: [`Accelerated London System`, `London`, `Common London`] },
            { name: `London System`, move: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4'], idx: 60, fen: `rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3`, otherNames: [`original London`] },
            { name: `Vienna Game: Falkbeer var.`, move: ['e4', 'e5', 'Nc3', 'Nf6'], idx: 61, fen: `rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3`, otherNames: [`vienna game falkbeer variation`] },
            { name: `Vienna Game`, move: ['e4', 'e5', 'Nc3'], idx: 62, fen: `rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2`, otherNames: [`vienna game`] },
            { name: `Vienna Game: Falbeer, Vienna Gambit`, move: ['e4', 'e5', 'Nc3', 'Nf6', 'f4'], idx: 63, fen: `rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq - 0 3`, otherNames: ['Vienna Gambit'] },
            { name: `Vienna Game: Main Line`, move: ['e4', 'e5', 'Nc3', 'Nf6', 'g3'], idx: 64, fen: `rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR b KQkq - 0 3`, otherNames: [] },
            { name: `French Defence: Exchange Variation`, move: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5'], idx: 65, fen: `rnbqkbnr/ppp2ppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4`, otherNames: [`french exchange`] },
            { name: `French Defence: Advance Variation`, move: ['e4', 'e6', 'd4', 'd5', 'e5'], idx: 66, fen: `rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3`, otherNames: [`french advance`] },

        ]
    };
    evaluateBoardmodule['openings'] = openings;
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
    var chessPositionData = {
        middlegame: {
            pst_w: {
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
            },
            pst_b: {},
            pstOpponent: {},
            pstSelf: {},
            coveredSquares: {

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
            }
        },
        Opening: {
            coveredSquares: {
                pst_w: {
                    p: [
                        [100, 100, 100, 100, 105, 100, 100, 100],
                        [78, 83, 86, 73, 102, 82, 85, 90],
                        [7, 29, 21, 44, 40, 31, 44, 7],
                        [-17, 16, 10, 24, 24, 1, 15, -13],
                        [-26, 3, 10, 9, 6, 1, 0, -23],
                        [-22, 9, 5, -11, -10, -2, 3, -19],
                        [-31, 8, -7, -37, -36, -14, 3, -31],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                    ],/* ㅋㅋㅋㅋ 중앙컨트롤은 중요하니까... 폰으로 */
                    n: [
                        [-66, -53, -75, -75, -10, -55, -58, -70],
                        [-3, -6, 100, -36, 4, 62, -4, -14],
                        [10, 67, 1, 74, 73, 27, 62, -2],
                        [24, 24, 45, 37, 43, 41, 25, 17],
                        [-1, 5, 31, 41, 22, 35, 2, 0],
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
                },
                pst_b: {},
                pstOpponent: {},
                pstSelf: {},
            },
            pst_w: {
                p: [
                    [10, 10, 10, 10, 10, 10, 10, 10],
                    [80, 95, 80, 85, 80, 85, 80, 85],
                    [65, 70, 70, 60, 60, 60, 60, 60],
                    [-17, 16, -2, 15, 14, 0, 15, -13],
                    [-26, 3, 10, 39, 46, 1, 0, -23],
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
                    [25, 27, 20, 34, 26, 25, 35, 10],
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
            },
            pst_b: {},
            pstOpponent: {},
            pstSelf: {},
        },
        endGame: {
            coveredSquares: {
                pst_w: {
                    p: [
                        [100, 100, 100, 100, 100, 100, 100, 100],
                        [50, 65, 50, 55, 50, 55, 50, 55],
                        [35, 40, 40, 30, 30, 40, 30, 30],
                        [20, 20, 20, 40, 40, 20, 20, 20],
                        [10, 10, 10, 40, 40, 40, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                    ],
                    b: [
                        [-10, -10, -10, -10, -10, 20, 20, 20],
                        [-5, 0, 5, 10, 10, 55, 0, -5],
                        [20, 50, 50, 50, 50, 50, 20, 20],
                        [-10, 30, 40, 50, 50, 10, 0, 20],
                        [-10, 30, 40, 50, 50, 10, 0, 20],
                        [-10, 20, 20, 20, 20, 10, -10, 20],
                        [0, 30, 30, 30, 30, 30, 0, 30],
                        [-20, -20, -20, -20, 10, 10, -20, -20],
                    ],
                    n: [
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 20, 20, 10, 10, 10],
                        [10, 10, 10, 20, 20, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                        [10, 10, 10, 10, 10, 10, 10, 10],
                    ],
                    q: [
                        [20, 10, 0, -10, -10, 0, 10, 20],
                        [10, 5, 0, -5, -5, 0, 5, 10],
                        [5, 0, -5, -10, -10, -5, 0, 5],
                        [-10, -10, -10, 30, 30, -10, -10, -10],
                        [-10, -10, -10, 30, 30, -10, -10, -10],
                        [5, 0, 5, -10, -10, -5, 0, 5],
                        [10, 5, 0, -5, -5, 0, 5, 10],
                        [20, 10, 0, -10, -10, 0, 10, 20],
                    ],
                    k: [
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                    ],
                    r: [
                        [-10, -10, -10, -10, 5, -10, -10, -10],
                        [45, 45, 45, 45, 60, 45, 45, 45],
                        [30, 30, 30, 30, 75, 30, 30, 30],
                        [-20, -20, -20, -20, -5, -20, -20, -20],
                        [0, 0, 0, 0, 15, 0, 0, 0],
                        [30, 30, 30, 30, 45, 30, 30, 30],
                        [-20, -20, -20, -20, -5, -20, -20, -20],
                        [-10, -10, -10, -10, 5, -10, -10, -10],
                    ],
                },
                pst_b: {},
                pstOpponent: {},
                pstSelf: {},
            },
            pst_w: {
                p: [
                    [100, 100, 100, 100, 100, 100],
                    [80, 80, 80, 80, 80, 80],
                    [20, 20, 20, 20, 20, 20],
                    [10, 10, 10, 10, 10, 10],
                    [10, 10, 10, 10, 10, 10],
                    [20, 20, 20, 20, 20, 20],
                    [10, 10, 10, 10, 10, 10],
                    [0, 0, 0, 0, 0, 0],
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
            },
            pst_b: {},
            pstOpponent: {},
            pstSelf: {},
        },
    };
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
    var psts = {
        opening: chessPositionData.Opening,
        middlegame: chessPositionData.middlegame,
        endGame: chessPositionData.endGame,
    }
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
    chessPositionData.endGame.coveredSquares.pst_b = {
        p: chessPositionData.endGame.coveredSquares.pst_w['p'].slice().reverse(),
        n: chessPositionData.endGame.coveredSquares.pst_w['n'].slice().reverse(),
        b: chessPositionData.endGame.coveredSquares.pst_w['b'].slice().reverse(),
        q: chessPositionData.endGame.coveredSquares.pst_w['q'].slice().reverse(),
        k: chessPositionData.endGame.coveredSquares.pst_w['k'].slice().reverse(),
        r: chessPositionData.endGame.coveredSquares.pst_w['r'].slice().reverse(),
    };

    chessPositionData.endGame.pst_b = {
        p: chessPositionData.endGame.pst_w['p'].slice().reverse(),
        n: chessPositionData.endGame.pst_w['n'].slice().reverse(),
        b: chessPositionData.endGame.pst_w['b'].slice().reverse(),
        q: chessPositionData.endGame.pst_w['q'].slice().reverse(),
        k: chessPositionData.endGame.pst_w['k'].slice().reverse(),
        r: chessPositionData.endGame.pst_w['r'].slice().reverse(),
    };
    chessPositionData.middlegame.pst_b = {
        p: chessPositionData.middlegame.pst_w['p'].slice().reverse(),
        n: chessPositionData.middlegame.pst_w['n'].slice().reverse(),
        b: chessPositionData.middlegame.pst_w['b'].slice().reverse(),
        q: chessPositionData.middlegame.pst_w['q'].slice().reverse(),
        k: chessPositionData.middlegame.pst_w['k'].slice().reverse(),
        r: chessPositionData.middlegame.pst_w['r'].slice().reverse(),
    }

    chessPositionData.Opening.pst_b = {
        p: chessPositionData.Opening.pst_w['p'].slice().reverse(),
        n: chessPositionData.Opening.pst_w['n'].slice().reverse(),
        b: chessPositionData.Opening.pst_w['b'].slice().reverse(),
        q: chessPositionData.Opening.pst_w['q'].slice().reverse(),
        k: chessPositionData.Opening.pst_w['k'].slice().reverse(),
        r: chessPositionData.Opening.pst_w['r'].slice().reverse(),
    }
    chessPositionData.middlegame.pstOpponent = {
        w: chessPositionData.middlegame.pst_w,
        b: chessPositionData.middlegame.pst_b,
    }
    chessPositionData.middlegame.pstSelf = {
        w: chessPositionData.middlegame.pst_w,
        b: chessPositionData.middlegame.pst_b,
    }

    chessPositionData.Opening.pstOpponent = {
        w: chessPositionData.Opening.pst_w,
        b: chessPositionData.Opening.pst_b,
    }
    chessPositionData.Opening.pstSelf = {
        w: chessPositionData.Opening.pst_w,
        b: chessPositionData.Opening.pst_b,
    }
    chessPositionData.Opening.coveredSquares.pstOpponent = {
        w: chessPositionData.Opening.coveredSquares.pst_w,
        b: chessPositionData.Opening.coveredSquares.pst_b,
    }
    chessPositionData.Opening.coveredSquares.pstSelf = {
        w: chessPositionData.Opening.coveredSquares.pst_w,
        b: chessPositionData.Opening.coveredSquares.pst_b,
    }

    chessPositionData.endGame.coveredSquares.pstOpponent = {
        w: chessPositionData.endGame.coveredSquares.pst_w,
        b: chessPositionData.endGame.coveredSquares.pst_b,
    }
    chessPositionData.endGame.coveredSquares.pstSelf = {
        w: chessPositionData.endGame.coveredSquares.pst_w,
        b: chessPositionData.endGame.coveredSquares.pst_b,
    }

    chessPositionData.endGame.pstOpponent = {
        w: chessPositionData.pst_w,
        b: chessPositionData.endGame.pst_b,
    }
    chessPositionData.endGame.pstSelf = {
        w: chessPositionData.endGame.pst_w,
        b: chessPositionData.endGame.pst_b,
    }
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
    /*
     * Evaluates the board at this point in time,
     * using the material weights and piece square tables.
     */
    function evaluateBoard(game, move, prevSum, OME, colour) {
        if (game.in_checkmate()) {

            // Opponent is in checkmate (good for us)
            if (move.color === colour) {
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
            if (move.color === colour) {
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
            if (move.color === colour) {
                prevSum +=
                    weights[move.captured] +
                    chessPositionData[OME].pstOpponent[move.color][move.captured][to[0]][to[1]];
            }
            // Our piece was captured (bad for us)
            else {
                prevSum -=
                    weights[move.captured] +
                    chessPositionData[OME].pstSelf[move.color][move.captured][to[0]][to[1]];
            }
        }

        if (move.flags.includes('p')) {
            // NOTE: promote to queen for simplicity
            move.promotion = 'q';

            // Our piece was promoted (good for us)
            if (move.color === colour) {
                prevSum -=
                    weights[move.piece] + chessPositionData[OME].pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum +=
                    weights[move.promotion] +
                    chessPositionData[OME].pstSelf[move.color][move.promotion][to[0]][to[1]];
            }
            // Opponent piece was promoted (bad for us)
            else {
                prevSum +=
                    weights[move.piece] + chessPositionData[OME].pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum -=
                    weights[move.promotion] +
                    chessPositionData[OME].pstSelf[move.color][move.promotion][to[0]][to[1]];
            }
        } else {
            // The moved piece still exists on the updated board, so we only need to update the position value
            if (move.color !== colour) {
                prevSum += chessPositionData[OME].pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum -= chessPositionData[OME].pstSelf[move.color][move.piece][to[0]][to[1]];
            } else {
                prevSum -= chessPositionData[OME].pstSelf[move.color][move.piece][from[0]][from[1]];
                prevSum += chessPositionData[OME].pstSelf[move.color][move.piece][to[0]][to[1]];
            }
        }
        var possibleMoves = game.moves();
        var boardsimple = boardinsimplearr(game.board());
        /*for (var i = 0; i < possibleMoves.length; i++) {
            var movethatcovers = game.move(possibleMoves[i]);

            var coveredSquares = chessPositionData[OME].coveredSquares;
            for (var i1 = 0; i1 < coveredSquares.pstSelf[colour].length; i1++){
                var onerow = coveredSquares.pstSelf[colour][i1];
                for (var i2 = 0; i2 < onerow.length; i2++){
                    
                }
            }
            var valssimple = boardinsimplearr(coveredSquares.pstSelf[colour]);
            for (var i1 = 0; i1 < valssimple.length; i1++) {
                if (valssimple.to == squaresandtheirIdx[i1]) {
                    prevSum += (valssimple[i1] - 45);
                }
            }
            game.undo();
        }*/
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