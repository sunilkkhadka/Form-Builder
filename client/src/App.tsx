import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import "../src/assets/styles/main.scss";

import RightBar from "./components/RightBar";
import LeftNavbar from "./components/LeftNavbar";
import DroppableArea from "./components/DroppableArea";

function App() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(e: any) {
    if (e.over && e.over.id === "drop") {
      setIsDropped(true);
    }
  }

  return (
    <main>
      <DndContext onDragEnd={handleDragEnd}>
        <main className="main-container">
          <LeftNavbar />
          <DroppableArea isDropped={isDropped} />
          <RightBar />
        </main>
      </DndContext>
    </main>
  );
}

export default App;
