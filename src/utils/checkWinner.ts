const checkWinner = ({ matches = [], playerTurn }: GameParamaters): number => {
    const isWinner = matches.filter(line => line.trim().length > 0).length == 0;
    if (isWinner) {
        return playerTurn ? 0 : 1;
    }
    return -1;
};

export default checkWinner;
