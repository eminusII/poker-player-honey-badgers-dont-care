const e = require("express");

const getBetAmount = (gs) => {
    const ourPlayer = gs.players[gs.in_action];
    const { hole_cards, stack } = ourPlayer;
    const community_cards = gs.community_cards;
    const current_buy_in = gs.current_buy_in;

    const activePlayers = gs.players.map(
        (player) => player.status === "active"
    );

    if (
        gs.in_action === gs.dealer &&
        current_buy_in === gs.small_blind * 2 &&
        activePlayers.length === 3
    ) {
        if (pair(hole_cards)) {
            return stack;
        }

        if (community_cards && pairWithCommunity(hole_cards, community_cards)) {
            return stack;
        }

        if (!community_cards && isHigherThan(hole_cards, 24)) {
            return stack;
        }

        if (community_cards && sameSuitCount(hole_cards, community_cards)) {
            const ssc = sameSuitCount(hole_cards, community_cards);
            if (ssc > 3 && community_cards.length < 4) {
                return stack;
            }
        }
    }

    if (
        activePlayers.length === 2 &&
        (pair(hole_cards) ||
            pairWithCommunity(hole_cards, community_cards) ||
            isHigherThan(hole_cards, 24))
    ) {
        return stack;
    }

    if (pair(hole_cards)) {
        return pair(hole_cards) >= 10 ? stack : 0;
    }

    if (community_cards && pairWithCommunity(hole_cards, community_cards)) {
        return pairWithCommunity(hole_cards, community_cards) >= 10 ? stack : 0;
    }

    if (!community_cards && isHigherThan(hole_cards, 24)) {
        return parseInt(stack / 5);
    }

    if (community_cards && sameSuitCount(hole_cards, community_cards)) {
        const ssc = sameSuitCount(hole_cards, community_cards);
        if (ssc > 3 && community_cards.length < 4) {
            return stack;
        }
    }

    return 0;
};

const rankToNumber = (rank) => {
    switch (rank) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        default:
            return parseInt(rank);
    }
};

const isHigherThan = (cards, maxSum = 24) => {
    const r1 = rankToNumber(cards[0].rank);
    const r2 = rankToNumber(cards[1].rank);

    return r1 + r2 >= maxSum ? true : false;
};

const sameSuitCount = (cards, communityCards) => {
    if (cards[0].suit !== cards[0].suit) {
        return 0;
    }

    const suit = cards[0].suit;

    const communityCardSuit = communityCards.map((card) => card.suit);

    let c = 2;
    for (let i = 0; i < communityCardSuit.length; i++) {
        if (communityCardSuit[i] === suit) {
            c += 1;
        }
    }

    if (communityCardSuit.includes(cards[0].suit)) {
        return c;
    }

    if (communityCardSuit.includes(cards[1].suit)) {
        return c;
    }

    return 0;
};

const pair = (cards) => {
    return cards[0].rank === cards[1].rank ? cards[1].rank : 0;
};

const pairWithCommunity = (cards, communityCards) => {
    const communityCardRanks = communityCards.map((card) => card.rank);

    if (communityCardRanks.includes(cards[0].rank)) {
        return cards[0].rank;
    }

    if (communityCardRanks.includes(cards[1].rank)) {
        return cards[1].rank;
    }

    return 0;
};

module.exports.getBetAmount = getBetAmount;
