import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./ModalMenu.scss";
import "./Menu.scss";
import menuicon from "../assets/menu-icon.png";
import MyModal from "./MyModal";

const ModalMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState({isOpen: false, top: 0, left: 0});
  const nodeId: string ="menu";

  return (
    <div className="container" id="menu">
      <div className="navitem" onClick={(event) => {
        const buttonPlac = event.currentTarget.getBoundingClientRect();
        setModalIsOpen({isOpen:true, top: buttonPlac.top + window.scrollY, left: buttonPlac.left + window.scrollX});
        }}>
         <img src={menuicon} />
         Meny
      </div>
      <MyModal
        isOpen={modalIsOpen.isOpen}
        onRequestClose={() => setModalIsOpen({isOpen: false, top: 0, left:0})}
        headLine="Meny"
        content="Detta är information från menyn."
        position={{top: modalIsOpen.top, left:modalIsOpen.left}}
        parentId={'#'+nodeId}
      />
    </div>
  );
};

export default ModalMenu;
