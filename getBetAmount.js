const getBetAmount = (gs) => {
    const ourPlayer = gs.players[gs.in_action];
    const { hole_cards, stack } = ourPlayer;
    const community_cards = gs.community_cards;

    if (hasPair(hole_cards)) {
        return stack;
    }

    if (community_cards && hasPairWithCommunity(hole_cards, community_cards)) {
        return stack;
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
