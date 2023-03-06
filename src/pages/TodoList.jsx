import axios from "axios";
import { useState, useEffect } from "react";
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
      <AddForm />
      <hr />
      <h3>Lista de To-Do</h3>
      <ul>
        {allTodos.map(({ title, _id }) => (
          <li key={_id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
