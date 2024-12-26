import { Provider as ChakraProvider } from "@/components/ui/provider";
import "antd/dist/reset.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ReactFlowProvider } from "react-flow-renderer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReactFlowProvider>
    </DndProvider>
  </React.StrictMode>
);
