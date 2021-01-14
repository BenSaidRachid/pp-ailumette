import strings from "../data/strings";

const winnerMessage = (winner: number): string => {
    if (winner == 0) return "You lost, too bad..";
    return "I lost.. snif.. but I’ll get you next time!!";
};

const infoMessage = (data: { playerTurn: boolean; nbMatches: number; nbLines: number }): string => {
    return strings.matchesRemoved(data);
};

const errorMessage = (winner: number): void => {
    switch (winner) {
    }
};

export { winnerMessage, infoMessage, errorMessage };
