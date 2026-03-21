import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/create" element={<CreateUser />} />
    </Routes>
  );
}

export default App;