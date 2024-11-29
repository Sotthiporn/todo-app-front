import axiosInstance from "@/utils/axios";

// Fetch Todos
export const fetchTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos");
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// Add a new Todo
export const addTodo = async (newTodo) => {
  try {
    const response = await axiosInstance.post("/todos", { text: newTodo, completed: false });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// Update Todo
export const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };
  

// Delete Todo
export const deleteTodo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// Toggle Todo Status
export const toggleTodoComplete = async (id) => {
    try {
        const response = await axiosInstance.patch(`/todos/${id}/toggle-complete`);
        return response?.data;
    } catch (error) {
        throw error;
    }
};

// Action to reset all todos' completion status
export const resetAllTodosComplete = async () => {
    try {
        const response = await axiosInstance.patch('/todos/toggle-all-complete');
        return response?.data;
    } catch (error) {
        throw error;
    }
};
