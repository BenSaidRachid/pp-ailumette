type Command = {
    command: string;
    question: number;
};

const commandText = (playerTurn: boolean, question: number): Command => {
    if (playerTurn) {
        if (question == 0) {
            return { command: "Your turn:\nLine:", question: question + 1 };
        } else {
            return { command: "Matches:", question: 0 };
        }
    }
    return { command: "AI’s turn...", question: 0 };
};

export default commandText;
