import { elementData } from "../data/element.data";

import ElementItem from "./ElementItem";

const LeftNavbar = () => {
  return (
    <div className="element">
      <h2 className="element__title">Pick Your Item</h2>
      {elementData.map((element) => (
        <ElementItem key={element.id} {...element} />
      ))}
    </div>
  );
};

export default LeftNavbar;
