import '../styles/Menu.scss';
import menuicon from "../assets/menu-icon.png";
import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router";

Modal.setAppElement("#root");

export default function Menu() {
  const [modalIsOpen, setModalState] = useState(false);

  return (
    <div className="menu">
      <div
        className="navitem"
        onClick={() => {
          setModalState(true);
        }}
      >
        <img src={menuicon} />
        Menu
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalState(false)}
        className="menuModal"
      >
        <div className="menuList" style={{width: "50%"}}>
          <h2>Meny</h2>
          <p>
            <Link
              to="/"
              onClick={() => {
                setModalState(false);
              }}
            >
              Hem
            </Link>
          </p>
          <p>
            <a href="/about"
              onClick={() => {
                setModalState(false);
              }}
            >
              Om projektet
            </a>
          </p>
          <p>
            <Link
              to="/rules"
              onClick={() => {
                setModalState(false);
              }}
            >
              Regler för Wordle
            </Link>
          </p>

          <p>
            <a href="/highscores"
              onClick={() => {
                setModalState(false);
              }}
            >
              Se highscore-listan
            </a>
          </p>
        </div>

        <button className="closeBtn" onClick={() => setModalState(false)}>X</button>
      </Modal>
    </div>
  );
}
