import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider className="h-[100vh]">
      <main className="light text-foreground bg-background h-screen">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
