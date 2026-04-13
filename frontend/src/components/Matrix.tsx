import "../styles/Matrix.scss";
import type { testTuple } from '../../../shared/types';
import type { ReactNode } from "react";
interface matrixProps {
    guessMatrix: Array<Array<testTuple>>
};

export default function Matrix({guessMatrix}: matrixProps): ReactNode {
    
    return (
        <div className="wordmatrix">
            {guessMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="matrixrow">
                    {row.map((char, charIndex) => (
                        <div key={charIndex} 
                        className="matrixsquare" 
                        style={{backgroundColor: char.result == 'correct' ? 'green' : char.result == 'misplaced' ? 'yellow' : char.result == 'incorrect' ? 'red': 'gray'}}>
                            {char.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};