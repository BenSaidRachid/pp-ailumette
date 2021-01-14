import {
    log,
    readLine as rl,
    commandText,
    messages,
    checkCommand,
    checkWinner,
    removeMatches,
} from "./";

const readLine = function ({
    playerTurn = true,
    question = 0,
}: GameParamaters): Promise<GameParamaters> {
    const { command, question: newQuestion } = commandText(playerTurn, question);
    return new Promise(resolve => {
        rl.question(command, (answer: string) => {
            resolve({ playerTurn, question: newQuestion, answer });
        });
    });
};

const AITurn = async (params: GameParamaters, data: GameParamaters): Promise<void> => {};

const playerTurn = async (
    params: GameParamaters,
    data: GameParamaters,
): Promise<GameParamaters> => {
    const { matches = [], nbLines = "" } = params;
    const { question, answer } = data;
    if (question == 1) {
        const nbLines = answer;
        checkCommand.checkLine({ matches, nbLines });
        return { question, nbLines, ...params };
    } else {
        const nbMatches = answer || "";
        checkCommand.checkMatch({
            matches,
            nbLines,
            nbMatches,
        });
        const index = parseInt(nbLines) - 1;
        const line = matches[index];
        matches[index] = removeMatches({ line, nbRemove: parseInt(nbMatches) });
        const winner = checkWinner(params);
        return { matches, question, playerTurn: false, winner };
    }
};

const gameLogic = async (params: GameParamaters): Promise<string | void> => {
    if (params.winner && params.winner != -1) return messages.winnerMessage(params.winner);
    if (params.matches) log.info(params.matches.join("\n"));
    try {
        if (params.playerTurn) {
            const data = await readLine({ matches: params.matches, question: params.question });
            const playerParams = await playerTurn(params, data);
            await gameLogic(playerParams);
        } else {
            // await AITurn(params, data);
            console.log("the end");
        }
    } catch (error) {
        log.error(error);
        await gameLogic({ question: 0, ...params });
    }

    return;
};

export default gameLogic;
