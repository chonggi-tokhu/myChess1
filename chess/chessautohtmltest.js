import { docChess } from "./chessauto_module.js";
globalThis.chessauto = docChess;
var onCompleteLoadingBoard = window.chessauto.CompleteLoadingBoard;
window.addEventListener("CompleteLoadingBoard", function (eventparam) {
    if (eventparam.detail.complete == false) {
        var boardson = chessauto.autochess('oneOfMyBoards', '.', document.body, new chessauto.config());
        onCompleteLoadingBoard.detail.complete = true;
    }
});
window.addEventListener("load", function (eventparam) {
    window.dispatchEvent(onCompleteLoadingBoard);
});