// import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import "../src/assets/styles/main.scss";

import RightBar from "./components/RightBar";
import LeftNavbar from "./components/LeftNavbar";
import DroppableArea from "./components/DroppableArea";
import { useDispatch } from "react-redux";
import { add } from "./features/form/formSlice";

function App() {
  // const [isDropped, setIsDropped] = useState(false);

  const dispatch = useDispatch();

  function handleDragEnd(e: DragEndEvent) {
    if (e.over && e.over.id === "drop") {
      dispatch(
        add({
          id: uuidv4(),
          text: "Hello World",
          isDropped: true,
        })
      );
    }
  }

  return (
    <main>
      <DndContext onDragEnd={handleDragEnd}>
        <main className="main-container">
          <LeftNavbar />
          <DroppableArea />
          <RightBar />
        </main>
      </DndContext>
    </main>
  );
}

export default App;
