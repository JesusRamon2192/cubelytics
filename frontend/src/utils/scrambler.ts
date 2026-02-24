const MOVES = ['U', 'D', 'L', 'R', 'F', 'B'];
const MODIFIERS = ['', "'", '2'];

export const generateScramble = (length: number = 21): string => {
    let scramble = [];
    let lastMove = -1;
    let secondLastMove = -1;

    for (let i = 0; i < length; i++) {
        let move;
        do {
            move = Math.floor(Math.random() * MOVES.length);
        } while (
            move === lastMove ||
            (Math.floor(move / 2) === Math.floor(lastMove / 2) && move === secondLastMove)
        );

        secondLastMove = lastMove;
        lastMove = move;

        const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
        scramble.push(MOVES[move] + modifier);
    }

    return scramble.join(' ');
};
