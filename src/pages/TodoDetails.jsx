import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  deleteOneTodoService,
  getSingleTodoService,
} from "../services/todo.services";

function TodoDetails() {
  const [singleTodo, setSingleTodo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { todoId } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getSingleTodoService(todoId);

      setSingleTodo(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
      // console.log(error); // ! TRACE IT ON devtools > nertwork
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteOneTodoService(todoId);
      redirect("/todos");
    } catch (error) {
      redirect("/error");
      // console.log(error); // ! TRACE IT ON devtools > nertwork
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
          <button onClick={handleDeleteTodo}>DELETE</button>
          <Link to={`/todos/${todoId}/edit`}>EDIT</Link>
        </div>
      )}
    </div>
  );
}

export default TodoDetails;
