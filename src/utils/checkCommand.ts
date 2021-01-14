const checkLineRange = ({ matches = [], nbLines = "" }: GameParamaters): void => {
    if (matches.length < parseInt(nbLines) || parseInt(nbLines) == 0)
        throw new Error("this line is out of range");
};

const checkLineInput = ({ nbLines = "" }: GameParamaters): void => {
    if (parseInt(nbLines) < 0 || isNaN(parseInt(nbLines)))
        throw new Error("invalid input (positive number expected)");
};

const checkMatchInput = ({ nbMatches = "" }: GameParamaters): void => {
    if (parseInt(nbMatches) < 0 || isNaN(parseInt(nbMatches)))
        throw new Error("invalid input (positive number expected)");
    else if (isNaN(parseInt(nbMatches))) throw new Error("you have to remove at least one match");
};

const checkMatchInLine = ({ matches = [], nbLines = "", nbMatches = "" }: GameParamaters): void => {
    if (matches[parseInt(nbLines) - 1].trim().length < parseInt(nbMatches))
        throw new Error("not enough matches on this line");
};

const checkLine = (params: GameParamaters): void => {
    checkLineRange(params);
    checkLineInput(params);
};

const checkMatch = (params: GameParamaters): void => {
    checkMatchInput(params);
    checkMatchInLine(params);
};

export default { checkLine, checkMatch };
