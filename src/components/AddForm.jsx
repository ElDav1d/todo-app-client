import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { createOneTodoService } from "../services/todo.services";
function AddForm(props) {
  const redirect = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //* CONTACT BACKEND => create Todo and pass data
    //! event handler is ASYNC
    if (isLoggedIn) {
      const newTodo = { title, description, isUrgent };
      try {
        const response = await createOneTodoService(newTodo);
        console.log(response);
        // redirect("/todos"); //! NOT WORKING: React is not re-rendering if redirect to SAME ROUTE
        props.getData(); // TRIGGER FUNCTION ON PARENT (passed as prop)
      } catch (error) {
        console.log(error);
        /// REDIRECT
      }
    } else {
      redirect("/login");
    }
  };

  return (
    <div>
      <h3>Agregar To-Do</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <label htmlFor="isUrgent">Urgent</label>
        <input
          type="checkbox"
          name="isUrgent"
          onChange={handleIsUrgentChange}
          checked={isUrgent} //* no value  BUT checked={Boolean}
        />

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddForm;
