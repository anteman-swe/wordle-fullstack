import React, { useState } from 'react';
import '../styles/WordLengthSelector.scss';

interface WordLengthSelectorProps {
  onLengthChange?: (length: number) => void;
  presentLength: number;
}

const WordLengthSelector: React.FC<WordLengthSelectorProps> = ({ onLengthChange, presentLength }) => {
  const [wordLength, setWordLength] = useState<number>(presentLength);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setWordLength(value);
    if (onLengthChange) {
      onLengthChange(value);
    }
  };

  return (
    <div className='wordLengthContainer'>
      <label>Välj ordlängd:</label>
      <input
        type="range"
        min="3"
        max="8"
        value={wordLength}
        onChange={handleChange}
        className="sliderStyles"
      />
      <span>{wordLength}</span>
    </div>
  );
};

export default WordLengthSelector;