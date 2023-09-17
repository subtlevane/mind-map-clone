import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MindMap from './components/MindMap';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MindMap />
    </DndProvider>
  );
}

export default App;
