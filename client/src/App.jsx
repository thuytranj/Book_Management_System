import { useState } from "react";
import Home from "./pages/Home.jsx";
import { BookProvider } from "./context/BookProvider.jsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <BookProvider>
        <Home />
      </BookProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}
 
export default App;
