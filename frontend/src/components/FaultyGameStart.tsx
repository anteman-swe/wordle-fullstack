import '../styles/GameLost.scss';
import type { FC } from "react";
import Modal from "react-modal";

interface FaultyProps {
  isOpen: boolean;
  onClose: () => void;
}

const FaultyGameStart: FC<FaultyProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className="lostModal"
    >
      <div>
        <p>
          Spelet kunde inte startas, spelservern kunde inte hitta något ord...
        </p>
      </div>
      <button className="closeBtn" onClick={() => onClose()}>
        X
      </button>
    </Modal>
  );
};

export default FaultyGameStart;
