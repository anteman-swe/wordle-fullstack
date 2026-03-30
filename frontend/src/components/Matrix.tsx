import "./Matrix.scss";

interface matrixProps {
    guessMatrix: Array<Array<string>>
};

export default function Matrix(props: matrixProps) {
    const guessMatrix = props.guessMatrix;
    
    return (
        <div className="wordmatrix">
            {guessMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="matrixrow">
                    {row.map((char, charIndex) => (
                        <div key={charIndex} className="matrixsquare">
                            {char}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};