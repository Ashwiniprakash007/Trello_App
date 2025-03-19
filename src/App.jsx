import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import "./components/style.css";

export default function App() {
  const [columns, setColumns] = useState([
    { title: "Features", cards: ["Task 1", "Task 2"] },
    { title: "How To Use", cards: [] },
    { title: "Welcome To React Kanban", cards: [] },
  ]);

  const moveCardBetweenColumns = (fromColumn, toColumn, cardIndex) => {
    const newColumns = [...columns];
    const cardToMove = newColumns[fromColumn].cards[cardIndex];
    if (!cardToMove) return;
    
    newColumns[fromColumn].cards.splice(cardIndex, 1);
    newColumns[toColumn].cards.push(cardToMove);
    
    setColumns(newColumns);
  };

  return (
    <div id="col_container">
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex", width: "100%", alignItems: "center", margin: "auto", gap: "50px" }} className="flex gap-4 p-4 bg-green-900 min-h-screen dark:bg-gray-900">
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
    </div>
  );
}
