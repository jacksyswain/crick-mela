import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchPage from "./pages/MatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:id" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;