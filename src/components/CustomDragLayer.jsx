import { useDragLayer } from "react-dnd";
import "./style.css";

const CustomDragLayer = () => {
  const { item, currentOffset, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <div
      className="custom-drag-preview"
      style={{
        left: currentOffset.x,
        top: currentOffset.y,
        transform: "scale(1.05)",
      }}
    >
      <div className="card">{item?.card}</div>
    </div>
  );
};

export default CustomDragLayer;
