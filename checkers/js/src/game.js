
/**
 * Game
 * @description checkers game
 */
 class Game {
    /**
     * @function constructor
     * @description checkers game
     * @access public
     *
     * @param {Board} board board
     *
     * @return {type} Description
     */﻿
    constructor(board) {
        this.finished = false;
        this.whiteTurn = true;
        this.board = board;
    }
}
