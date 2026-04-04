import "./Menu.scss";
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
        <div className="menuList">
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
            <Link
              to="/about"
              onClick={() => {
                setModalState(false);
              }}
            >
              Om projektet
            </Link>
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
            <Link
              to="/highscore"
              onClick={() => {
                setModalState(false);
              }}
            >
              Se highscore-listan
            </Link>
          </p>
        </div>

        <button className="closeBtn" onClick={() => setModalState(false)}>X</button>
      </Modal>
    </div>
  );
}
