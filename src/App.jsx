import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
import { ParkDetail } from "./pages/ParkDetail";
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/park/:slug" element={<ParkDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;