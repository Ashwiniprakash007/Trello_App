import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import "./components/style.css";
import CustomDragLayer from "./components/CustomDragLayer";

export default function App() {
  const [columns, setColumns] = useState([
    { title: "Features", cards: ["Task 1", "Task 2", "Task 3"] },
    { title: "How To Use", cards: ["Work on Electron", "Create Setup" , "Create Backend"] },
    { title: "Welcome To React Kanban", cards: ["Complete Trello", "Perform Automation"] },
    { title: "Completed", cards: ["Buy Pen", "Buy Book", "Buy Shoes"] },
  ]);


const moveCardBetweenColumns = (fromColumn, toColumn, cardIndex, newIndex) => {
  const newColumns = [...columns];
  const cardToMove = newColumns[fromColumn].cards.splice(cardIndex, 1)[0];

  if (!cardToMove) return;

  newColumns[toColumn].cards.splice(newIndex, 0, cardToMove);
  setColumns(newColumns);
};

return (
  <DndProvider backend={HTML5Backend}>
    <CustomDragLayer /> 
    <div className="kanban-board">
      {columns.map((col, index) => (
        <Column
          key={index}
          title={col.title}
          cards={col.cards}
          setCards={(newCards) => {
            const newColumns = [...columns];
            newColumns[index].cards = newCards;
            setColumns(newColumns);
          }}
          columnIndex={index}
          moveCardBetweenColumns={moveCardBetweenColumns}
        />
      ))}
    </div>
  </DndProvider>
);
}