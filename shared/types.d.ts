interface Message {
    text: string;
    gameID: string;
    timestamp: string;
}
interface testTuple {
    letter: string;
    result: string;
}
interface settingProps {
    updateGameStates: (guesses: number, chars: number, dups: boolean) => void;
    presentSettings: {
        guesses: number;
        chars: number;
        allowDups: boolean;
    };
}
export type { Message, testTuple, settingProps };
//# sourceMappingURL=types.d.ts.map