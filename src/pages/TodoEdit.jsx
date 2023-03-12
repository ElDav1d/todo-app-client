import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleTodoService,
  updateOneTodoService,
} from "../services/todo.services";

function TodoEdit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const redirect = useNavigate();
  const { todoId } = useParams();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked);

  useEffect(() => {
    // componentDidMount => ask BE for data to prefill
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getSingleTodoService(todoId);
      const { title, description, isUrgent } = response.data;
      //* becaus JS FIRST OBSERVES BLOCK SCOPE => not confusion with state variables!!
      setTitle(title);
      setDescription(description);
      setIsUrgent(isUrgent);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTodo = {
        title,
        description,
        isUrgent,
      };

      await updateOneTodoService(todoId, updatedTodo);
      redirect("/todos");
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <div>
      <h3>Editar To-Do</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />

        <label htmlFor="isUrgent">Urgent</label>
        <input
          type="checkbox"
          name="isUrgent"
          onChange={handleIsUrgentChange}
          checked={isUrgent}
        />

        <br />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default TodoEdit;
