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

    if (current_buy_in && current_buy_in < stack / 10) {
        return current_buy_in;
    }

    return 0;
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
