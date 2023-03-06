//* ALL FUNCTIONS FOR SAME CRUD (Todo)
import service from "./config.services";

// a section for EACH BACKEND ROUTE

const getAllTodosService = () => {
  return service.get("/todo"); // starts from baseURL
};

const createOneTodoService = (newTodo) => {
  return service.post("/todo", newTodo); // starts from baseURL
};

const getSingleTodoService = (todoId) => {
  return service.get(`/todo/${todoId}`); // starts from baseURL
};

const deleteOneTodoService = (todoId) => {
  return service.delete(`/todo/${todoId}`); // starts from baseURL
};

const updateOneTodoService = (todoId, body) => {
  return service.patch(`/todo/${todoId}`, body); // starts from baseURL
};

export {
  getAllTodosService,
  createOneTodoService,
  getSingleTodoService,
  deleteOneTodoService,
  updateOneTodoService,
};
