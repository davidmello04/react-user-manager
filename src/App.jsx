import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;