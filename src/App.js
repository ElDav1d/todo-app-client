import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";
import TodoEdit from "./pages/TodoEdit";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todos"
          element={
            <IsPrivate>
              <TodoList />
            </IsPrivate>
          }
        />
        <Route path="/todos/:todoId/details" element={<TodoDetails />} />
        <Route path="/todos/:todoId/edit" element={<TodoEdit />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
