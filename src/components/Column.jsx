import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";
import Card from "./Card";
import Modal from "./Modal";
import "./style.css";

const ItemType = "CARD";

const Column = ({ title, cards, setCards, columnIndex, moveCardBetweenColumns }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [modalText, setModalText] = useState("");

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item.columnIndex !== columnIndex) {
        moveCardBetweenColumns(item.columnIndex, columnIndex, item.index);
      }
    },
  });

  const addCard = () => {
    setEditingCardIndex(null);
    setModalText("");
    setModalOpen(true);
  };

  const editCard = (index) => {
    setEditingCardIndex(index);
    setModalText(cards[index]);
    setModalOpen(true);
  };

  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleModalSubmit = (text) => {
    if (text) {
      if (editingCardIndex !== null) {
        const updatedCards = [...cards];
        updatedCards[editingCardIndex] = text;
        setCards(updatedCards);
      } else {
        setCards([...cards, text]);
      }
    }
    setModalOpen(false);
  };

  return (
    <div className="column_container">
      <div ref={drop} className="w-64 bg-gray-200 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-2 dark:text-white">{title}</h2>
        <div className="flex flex-col gap-2 p-2">
          <div className="card-list">
            {cards.map((card, index) => (
              <Card
                key={index}
                index={index}
                columnIndex={columnIndex}
                card={card}
                editCard={editCard}
                deleteCard={deleteCard}
              />
            ))}
          </div>
        </div>
        <button onClick={addCard} className="mt-2 p-2 bg-blue-500 text-white rounded flex items-center gap-1 w-full">
          <FaPlus /> Add Card
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialText={modalText}
      />
    </div>
  );
};

export default Column;