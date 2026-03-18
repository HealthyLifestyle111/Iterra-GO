import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes if needed, but no login wrapper */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
