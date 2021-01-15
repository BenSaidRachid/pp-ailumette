import { cleanLine } from ".";

const checkLineRange = ({ matches = [], lineNum = "" }: GameParamaters): void => {
    if (matches.length < parseInt(lineNum) || parseInt(lineNum) == 0)
        throw new Error("this line is out of range");
};

const checkLineInput = ({ lineNum = "" }: GameParamaters): void => {
    if (parseInt(lineNum) < 0 || isNaN(parseInt(lineNum)))
        throw new Error("invalid input (positive number expected)");
};

const checkMatchInput = ({ nbMatches = "" }: GameParamaters): void => {
    if (parseInt(nbMatches) < 0 || isNaN(parseInt(nbMatches)))
        throw new Error("invalid input (positive number expected)");
    else if (isNaN(parseInt(nbMatches))) throw new Error("you have to remove at least one match");
};

const checkMatchInLine = ({ matches = [], lineNum = "", nbMatches = "" }: GameParamaters): void => {
    if (cleanLine(matches[parseInt(lineNum) - 1]).length < parseInt(nbMatches))
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
