import { exit } from "process";
import { log, generateGame, gameLogic } from "./utils";

const initGame = async (): Promise<void> => {
    log.info("Starting a new game");
    const matches = generateGame(4);
    await gameLogic({ matches, playerTurn: true });
    exit(0);
};

initGame();
