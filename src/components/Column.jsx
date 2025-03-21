
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";
import Card from "./Card";
import Modal from "./Modal";
import "./style.css";

const ItemType = "CARD";

const Column = ({ title, cards, setCards, columnIndex, moveCardBetweenColumns }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false); 
  const [hoverIndex, setHoverIndex] = useState(null); 

  // ✨ Restore Modal States
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [modalText, setModalText] = useState("");

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!monitor.isOver()) return;
      setIsDraggingOver(true); 
  
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
  
      let calculatedIndex = cards.length;
      for (let i = 0; i < cards.length; i++) {
        const cardElement = document.getElementById(`card-${columnIndex}-${i}`);
        if (!cardElement) continue;
  
        const { top, height } = cardElement.getBoundingClientRect();
        const middleY = top + height / 2;
  
        if (clientOffset.y < middleY) {
          calculatedIndex = i;
          break;
        }
      }
  
      setHoverIndex(calculatedIndex);
    },
    drop: (item) => {
      moveCardBetweenColumns(item.columnIndex, columnIndex, item.index, hoverIndex);
  
      setTimeout(() => {
        setIsDraggingOver(false);  
        setHoverIndex(null);  
      }, 50);
    },
    collect: (monitor) => {
      if (!monitor.isOver()) {
        setIsDraggingOver(false); 
        setHoverIndex(null);
      }
      return { isOver: monitor.isOver() };
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
          {isDraggingOver && hoverIndex == null && <div className="drop-placeholder"></div>}

          {cards.map((card, index) => (
            <div key={index} id={`card-${columnIndex}-${index}`}>
              {isDraggingOver && hoverIndex === index && <div className="drop-placeholder"></div>}
              
              <Card
                index={index}
                columnIndex={columnIndex}
                card={card}
                editCard={editCard} 
                deleteCard={deleteCard} 
              />
            </div>
          ))}

          {isDraggingOver && hoverIndex === cards.length && <div className="drop-placeholder"></div>}
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
