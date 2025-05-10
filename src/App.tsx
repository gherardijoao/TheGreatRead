import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyShelf from "./pages/MyShelf";
import Classicos from "./pages/Classicos";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minha-estante" element={<MyShelf />} />
        <Route path="/classicos" element={<Classicos />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
