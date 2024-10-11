import { useDraggable } from "@dnd-kit/core";

import { ElementProps } from "../types/element.type";

const ElementItem = (props: ElementProps) => {
  const { name, slug } = props;

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: slug,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="element__item"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p>{name}</p>
    </div>
  );
};

export default ElementItem;
