import {
    log,
    readLine as rl,
    commandText,
    messages,
    checkCommand,
    checkWinner,
    removeMatches,
    sleep,
    cleanLine,
} from "./";
import randomAIChoice from "./randomAIChoice";

const readLine = function ({ question = 0 }: GameParamaters): Promise<GameParamaters> {
    const { command, question: newQuestion } = commandText(question >= 0 ? question : 0);
    return new Promise(resolve => {
        rl.question(command, (answer: string) => {
            resolve({ question: newQuestion, answer });
        });
    });
};

const calculateMaxIteration = (nb: number): number => {
    if (nb <= 0) return nb;
    return nb - nb / 5;
};

const AIChoice = ({ matches = [] }: GameParamaters): GameParamaters => {
    let nbIterations = 0;
    const nbLines = matches.length;
    let lineNum = -1;

    while (lineNum < 0 || nbIterations < calculateMaxIteration(nbLines)) {
        const randomIndex = randomAIChoice({ max: nbLines - 1 });
        if (cleanLine(matches[randomIndex]).length > 0) lineNum = randomIndex;
        nbIterations++;
    }
    if (lineNum == -1) {
        const lines = matches.filter(line => line.length > 0);
        if (lines.length > 0) lineNum = 0;
        else return {};
    }
    const nbMatches = randomAIChoice({ min: 1, max: cleanLine(matches[lineNum]).length });
    return { lineNum: String(lineNum), nbMatches: String(nbMatches) };
};

const AITurn = async (params: GameParamaters): Promise<GameParamaters> => {
    const { matches = [] } = params;
    const { lineNum, nbMatches } = AIChoice(params);
    if (!(lineNum && nbMatches)) return {};
    const index = parseInt(lineNum);
    const line = matches[index];
    matches[index] = removeMatches({ line, nbRemove: parseInt(nbMatches) });
    const winner = checkWinner(params);
    await sleep(1500);
    log.info(messages.infoMessage({ playerTurn: false, lineNum: String(index + 1), nbMatches }));
    return { matches, playerTurn: true, winner };
};

const playerTurn = async (
    params: GameParamaters,
    data: GameParamaters,
): Promise<GameParamaters> => {
    const { matches = [], lineNum = "" } = params;
    const { question, answer } = data;
    if (question == 1) {
        const lineNum = answer;
        checkCommand.checkLine({ matches, lineNum });
        return { ...params, question, lineNum };
    } else {
        const nbMatches = answer || "";
        checkCommand.checkMatch({
            matches,
            lineNum,
            nbMatches,
        });
        const index = parseInt(lineNum) - 1;
        const line = matches[index];
        matches[index] = removeMatches({ line, nbRemove: parseInt(nbMatches) });
        const winner = checkWinner(params);
        log.info(messages.infoMessage({ playerTurn: true, lineNum, nbMatches }));
        return { matches, question, playerTurn: false, winner };
    }
};

const displayMatches = ({ matches = [] }: GameParamaters): void => {
    const verticalBorders = "*".repeat(matches[0].length + 2);
    const frame = matches.join("\n");
    console.log(`${verticalBorders}\n${frame}\n${verticalBorders}`);
};

const gameLogic = async (params: GameParamaters): Promise<void> => {
    if (params.winner && params.winner != -1) {
        log.info(messages.winnerMessage(params.winner));
        return;
    }
    if (params.matches && (!params.question || params.question == 0)) displayMatches(params);
    try {
        if (params.playerTurn) {
            const data = await readLine({ question: params.question });
            const playerParams = await playerTurn(params, data);
            await gameLogic(playerParams);
        } else {
            log.info("AI’s turn...");
            const AIParams = await AITurn(params);
            await gameLogic(AIParams);
        }
    } catch (error) {
        log.error(error);
        await gameLogic({ question: -1, matches: params.matches, playerTurn: params.playerTurn });
    }

    return;
};

export default gameLogic;
