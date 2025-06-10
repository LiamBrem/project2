import React from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null; // Don't render anything if displayModal is false
  }
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
