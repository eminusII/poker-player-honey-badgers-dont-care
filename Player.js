const { getBetAmount } = require("./getBetAmount");

class Player {
    static get VERSION() {
        return "0.6";
    }

    static betRequest(gameState, bet) {
        bet(getBetAmount(gameState));
    }

    static showdown(gameState) {}
}

module.exports = Player;
