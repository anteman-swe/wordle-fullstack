import Modal from "react-modal";
import "../styles/GameLost.scss";
import disappointment from "../assets/disappointed.png";
import type { ReactNode } from "react";

Modal.setAppElement("#root");

interface gameLostProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameLost({ isOpen, onClose }: gameLostProps): ReactNode {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className="lostModal"
    >
      <div>
        <img src={disappointment} />
        <p>Tyvärr!</p>
        <p>Du lyckades inte att hitta ordet...</p>
      </div>
      <button className="closeBtn" onClick={() => onClose()}>
        X
      </button>
      <button className="restartBtn" onClick={() => onClose()}>
        Starta om
      </button>
    </Modal>
  );
}
