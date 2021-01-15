type Command = {
    command: string;
    question: number;
};

const commandText = (question: number): Command => {
    if (question == 0) {
        return { command: "Your turn: \nLine: ", question: question + 1 };
    }
    return { command: "Matches: ", question: 0 };
};

export default commandText;
