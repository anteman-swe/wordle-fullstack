import { useState, type ReactNode } from "react";
import Modal from "react-modal";

import ToggleDups from "./ToggleDups";
import WordLengthSelector from "./wordLengthSelector";

import '../styles/Menu.scss';
import wheel from "../assets/settings-icon.png";

import type { settingProps } from "../../../shared/types";

Modal.setAppElement("#root");

export default function Settings({
  updateGameStates,
  presentSettings,
}: settingProps): ReactNode {
  const [modalIsOpen, setModalState] = useState<boolean>(false);

  function onLengthChange(value: number) {
    const noGuess: number = value + 1;
    updateGameStates(noGuess, value, presentSettings.allowDups);
  }

  function onDupsToggle(dupsState: boolean){
    updateGameStates(presentSettings.guesses, presentSettings.chars, dupsState);
  }

  return (
    <div className="menu">
      <div
        className="navitem"
        onClick={() => {
          setModalState(true);
        }}
      >
        <img src={wheel} />
        Spel
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setModalState(false)}}
        className="menuModal"
      >
        <div className="menuList">
          <h2>Spelinställningar</h2>
          <WordLengthSelector onLengthChange={onLengthChange} presentLength={presentSettings.chars}/>
          <ToggleDups onDupsToggle={onDupsToggle} allowDups={presentSettings.allowDups} />
        </div>
        <button className="closeBtn" onClick={() => setModalState(false)}>
          X
        </button>
      </Modal>
    </div>
  );
}
