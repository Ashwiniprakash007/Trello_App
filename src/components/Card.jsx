import { useDrag } from "react-dnd";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./style.css";

const ItemType = "CARD";

const Card = ({ card, index, columnIndex, editCard, deleteCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index, columnIndex, card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`card ${isDragging ? "dragging-card" : ""}`}
      
    >
      <span>{card}</span>
      <div className="edit_delete_container">
        <FaEdit id="edit-icon" className="cursor-pointer text-blue-500" onClick={() => editCard(index)} />
        <FaTrash id="delete-icon" className="cursor-pointer text-red-500" onClick={() => deleteCard(index)} />
      </div>
    </div>
  );
};

export default Card;

