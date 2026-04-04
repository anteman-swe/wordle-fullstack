import "./Matrix.scss";
import type { testTuple } from '../../../shared/types';
interface matrixProps {
    guessMatrix: Array<Array<testTuple>>
};

export default function Matrix({guessMatrix}: matrixProps) {
    
    return (
        <div className="wordmatrix">
            {guessMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="matrixrow">
                    {row.map((char, charIndex) => (
                        <div key={charIndex} 
                        className="matrixsquare" 
                        style={{backgroundColor: char.result == 'correct' ? 'green' : char.result == 'misplaced' ? 'yellow' : 'gray'}}>
                            {char.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};