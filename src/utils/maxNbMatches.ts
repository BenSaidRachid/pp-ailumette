const maxNbMatches = (lineNum: number): number => {
    let nbMatches = 1;
    for (let i = 0; i < lineNum - 1; i++) {
        nbMatches += 2;
    }

    return nbMatches;
};

export default maxNbMatches;
