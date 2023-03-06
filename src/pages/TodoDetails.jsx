import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TodoDetails() {
  const [singleTodo, setSingleTodo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { todoId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/todo/${todoId}`
      );

      setSingleTodo(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Detalles de To-Do</h3>

      {isFetching ? (
        <h3>...loading</h3>
      ) : (
        <div>
          <h4>{singleTodo.title}</h4>
          <p>{singleTodo.description}</p>
          <p>Is Urgent: {singleTodo.isUrgent ? "👍" : "👎"}</p>
        </div>
      )}
    </div>
  );
}

export default TodoDetails;
