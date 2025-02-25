import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./NewsList.jsx";
import AdminNews from "./AdminNews.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/admin" element={<AdminNews />} />
      </Routes>
    </Router>
  );
}

export default App;
