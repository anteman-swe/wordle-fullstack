import React, { useState } from "react";
import './ToogleDups.scss';

interface ToggleDupsProps {
    onDupsToggle: (toggle: boolean) => void;
    allowDups: boolean;
}

const ToggleDups: React.FC<ToggleDupsProps> = ({ onDupsToggle, allowDups }) => {
  const [allowDuplicates, setAllowDuplicates] = useState(allowDups);

  const handleToggle = () => {
    const dupsValue: boolean = !allowDuplicates;
    setAllowDuplicates(dupsValue);
    if(onDupsToggle) {
        onDupsToggle(dupsValue);
    }
  };

  return (
    <div className="toggleDuplicatesContainer">
      <label>{"Tillåt bokstavsdubletter:"}</label>
      <div
        onClick={handleToggle}
        style={{
          width: "50px",
          height: "20px",
          backgroundColor: allowDuplicates ? "#4CAF50" : "#ccc",
          borderRadius: "10px",
          position: "relative",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "2px",
            left: allowDuplicates ? "32px" : "2px",
            transition: "left 0.3s",
          }}
        />
      </div>
    </div>
  );
};
export default ToggleDups;
