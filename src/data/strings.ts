const strings = {
    matchesRemoved: ({
        playerTurn,
        nbMatches,
        nbLines,
    }: {
        playerTurn: boolean;
        nbMatches: number;
        nbLines: number;
    }): string =>
        `${playerTurn ? "Player" : "AI"} removed ${nbMatches} match(es) from line ${nbLines}`,
};

export default strings;
