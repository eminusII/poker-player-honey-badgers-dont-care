const getBetAmount = (gs) => {
    const ourPlayer = gs.players[gs.in_action];
    const { hole_cards, stack } = ourPlayer;
    const community_cards = gs.community_cards;
    const current_buy_in = gs.current_buy_in;

    if (hasPair(hole_cards)) {
        return stack;
    }

    if (community_cards && hasPairWithCommunity(hole_cards, community_cards)) {
        return stack;
    }

    if (isHighCard(hole_cards)) {
        return stack;
    }

    if (community_cards && sameSuitCount(hole_cards, community_cards)) {
        const ssc = sameSuitCount(hole_cards, community_cards);
        if (ssc > 3 && community_cards.length < 5) {
            return stack;
        }
    }

    if (hole_cards[0].suit === hole_cards[0].suit) {
        return current_buy_in;
    }

    if (current_buy_in && current_buy_in < parseInt(stack / 7)) {
        return current_buy_in;
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

const isHighCard = (cards) => {
    const r1 = rankToNumber(cards[0].rank);
    const r2 = rankToNumber(cards[1].rank);

    return r1 + r2 > 24 ? true : false;
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

    return false;
};

const hasPair = (cards) => {
    return cards[0].rank === cards[1].rank;
};

const hasPairWithCommunity = (cards, communityCards) => {
    const communityCardRanks = communityCards.map((card) => card.rank);

    if (communityCardRanks.includes(cards[0].rank)) {
        return true;
    }

    if (communityCardRanks.includes(cards[1].rank)) {
        return true;
    }

    return false;
};

module.exports.getBetAmount = getBetAmount;
