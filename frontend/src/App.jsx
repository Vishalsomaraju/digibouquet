import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Wrap from "./pages/Wrap";
import Message from "./pages/Message";
import Shared from "./pages/Shared";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Builder />} />
        <Route path="/wrap" element={<Wrap />} />
        <Route path="/message" element={<Message />} />
        <Route path="/shared/:id" element={<Shared />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
