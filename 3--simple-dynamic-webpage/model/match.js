const Player = require('../model/player');

class Match {

    constructor(playerList, time) {
        this.playerList = playerList;
        this.time = time;
    }

    getPlayerList() {
        return this.playerList;
    }

    getTime() {
        return this.time;
    }
}

module.exports = Match;