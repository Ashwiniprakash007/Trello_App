import { useState, useEffect } from "react";
import "./style.css";

const Modal = ({ isOpen, onClose, onSubmit, initialText }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setText(initialText || ""); 
    }
  }, [isOpen, initialText]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal_text">{initialText ? "Edit Card" : "Add Card"}</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="modal-input"
          placeholder="Enter card title"
        />
        <div className="modal-actions">
          <button className="btn-save" onClick={() => onSubmit(text)}>Save</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;