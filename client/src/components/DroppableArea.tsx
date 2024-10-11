import { useDroppable } from "@dnd-kit/core";

const DroppableArea = ({ isDropped }: { isDropped: boolean }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "drop",
  });

  return (
    <section className="canvas">
      <div
        className={`canvas__paper ${isOver ? "yellow" : ""}`}
        ref={setNodeRef}
      >
        {isDropped ? (
          <div>
            <input type="text" placeholder="Type Here" />
          </div>
        ) : (
          "Drop Items Here"
        )}
      </div>
    </section>
  );
};

export default DroppableArea;
