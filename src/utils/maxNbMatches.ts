const maxNbMatches = (nbLines: number): number => {
    let nbMatches = 1;
    for (let i = 0; i < nbLines - 1; i++) {
        nbMatches += 2;
    }

    return nbMatches;
};

export default maxNbMatches;
