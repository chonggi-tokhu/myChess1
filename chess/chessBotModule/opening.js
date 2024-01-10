(function (ep, gth, module) {
    myChessBot = module;
    (typeof myChessBot !== 'undefined') ? (typeof myChessBot.evaluateBoard.opening === 'undefined') ? myChessBot.evaluateBoard.opening = ep(gth) : myChessBot.evaluateBoard.opening = myChessBot.evaluateBoard.opening : (function (thisparam) { myChessBot = thisparam })(gth['myChessBot']);
})(function (win) {
    var thismodule = win['myChessBot'];
    var opening = {};
    var openings = {
        getOpeningByName(openingname) {
            var opname = new String(openingname);
            var rtv = { opening: null, index: null };
            this.named.forEach(function (val, idx, arr) {
                if (val.name == opname) {
                    rtv.opening = val;
                    rtv.index = val.idx;
                }
                if (val.otherNames.includes(opname)) {
                    rtv.opening = val;
                    rtv.index = val.idx;
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
            { name: `London System`, move: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4'], idx: 60, fen: `rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3`, otherNames: [`original London`] }
        ]
    };
    opening['openings'] = openings;
    console.log(opening);
    thismodule['evaluateBoard']['opening'] = opening;
    return opening;
}, globalThis, globalThis['myChessBot']);