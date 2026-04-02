import Modal from 'react-modal';

 // Ersätt '#root' med ID:t på din root-element

interface modalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  headLine: string;
  content: React.ReactNode;
  position: {
    top: number;
    left: number;
  };
  parentId:string;
}

const MyModal: React.FC<modalProps> = ({ isOpen, onRequestClose, headLine,  content, position,parentId }) => {
    Modal.setAppElement(parentId);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="meny-modal"
      className="menyModal"
      overlayClassName="myOverlay"
      style={{content: {position: 'absolute', ...position}}}
    >
      <h2>
        {headLine}
      </h2>
      <p>{content}</p>
      <button className="modalClose" onClick={onRequestClose}>X</button>
    </Modal>
  );
};

export default MyModal;