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

    if (community_cards && inSameSuit(hole_cards, community_cards)) {
        return current_buy_in + parseInt(current_buy_in / 10);
    }

    if (current_buy_in && current_buy_in < stack / 7) {
        return current_buy_in;
    }

    return 0;
};

const inSameSuit = (cards, communityCards) => {
    if (cards[0].suit !== cards[0].suit) {
        return false;
    }

    const suit = cards[0].suit;

    const communityCardSuit = communityCards.map((card) => card.suit);

    let c = 0;
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
