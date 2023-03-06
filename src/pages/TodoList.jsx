import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddForm from "../components/AddForm";

function TodoList() {
  const [allTodos, setAllTodos] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //! react STILL NOT ALLOWING async code on CONSTRUCTOR
  //* go USEEFFECT

  useEffect(() => {
    getData();
  }, []); // ComponentDidMount

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/todo");

      setAllTodos(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h3>...loading data</h3>;
  }

  return (
    <div>
      <AddForm getData={getData} />
      <hr />
      <h3>Lista de To-Do</h3>
      <ul>
        {allTodos.map((todo) => (
          <li key={todo._id}>
            <Link to={`/todos/${todo._id}/details`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
