import { maxNbMatches } from ".";

const formatString = (nbMatches: number, maxMatches: number): string => {
    const nbSpacing = (maxMatches - nbMatches) / 2;
    const matches = "|".repeat(nbMatches);
    const spacing = " ".repeat(nbSpacing);
    return spacing + matches + spacing;
};

const generateGame = (lineNum: number): string[] => {
    const matches = [...new Array(lineNum)].map(() => "");
    let nbMatches = 1;
    const maxMatches = maxNbMatches(lineNum);
    for (let i = 0; i < matches.length; i++) {
        matches[i] = formatString(nbMatches, maxMatches);
        nbMatches += 2;
    }
    return matches;
};

export default generateGame;
