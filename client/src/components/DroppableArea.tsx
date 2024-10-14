import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

import { RootState } from "../app/store";

import { selectItem } from "../features/form/formSlice";

const DroppableArea: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.form);
  const { setNodeRef, isOver } = useDroppable({
    id: "drop",
  });

  const dispatch = useDispatch();
  const { selectedItemId } = useSelector((state: RootState) => state.form);

  // State to track zoom and pan transformations
  const [transform, setTransform] = useState<{
    k: number;
    x: number;
    y: number;
  }>({ k: 1, x: 0, y: 0 });
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Adjust zoom behavior to use HTMLDivElement
    const zoomBehavior = d3
      .zoom<HTMLDivElement, unknown>() // Specify types here
      .scaleExtent([0.5, 3]) // Define zoom limits
      .on("zoom", (event) => {
        // Update the transformation state
        setTransform({
          k: event.transform.k,
          x: event.transform.x,
          y: event.transform.y,
        });
      });

    // Apply zoom behavior to the canvas__paper div
    const paper = d3.select(paperRef.current);
    paper.call(zoomBehavior);

    return () => {
      paper.on(".zoom", null); // Cleanup on component unmount
    };
  }, []);

  function getItemList() {
    if (items.length === 0) {
      return <p>Drop Items Here!</p>;
    }

    return items.map((item, index) => (
      <div
        key={index}
        className={`${selectedItemId === item.id ? "selected" : ""}`}
        onClick={() => dispatch(selectItem({ id: item.id }))}
      >
        {item.draftText}
      </div>
    ));
  }

  return (
    <section className="canvas">
      <div
        className="canvas__paper"
        ref={paperRef}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
          transformOrigin: "0 0", // Origin point for scaling
        }}
      >
        <div className={`${isOver ? "canvas__over" : ""}`} ref={setNodeRef}>
          {getItemList()}
        </div>
      </div>
    </section>
  );
};

export default DroppableArea;
