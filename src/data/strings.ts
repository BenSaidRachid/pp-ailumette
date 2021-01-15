const strings = {
    matchesRemoved: ({ playerTurn, nbMatches = "", lineNum = "" }: GameParamaters): string =>
        `${playerTurn ? "Player" : "AI"} removed ${nbMatches} match(es) from line ${lineNum}`,
};

export default strings;
