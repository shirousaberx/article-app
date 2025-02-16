import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import Preview from "./pages/Preview";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/edit/:id" element={<EditArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
