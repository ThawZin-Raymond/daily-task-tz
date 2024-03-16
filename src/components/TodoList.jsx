import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState({ id: null, text: "" });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleEditChange = (e) => {
    setEdit({ ...edit, text: e.target.value });
  };

  const handleEditTask = (id) => {
    const currentTask = tasks.find((task) => task.id === id);
    setEdit({ id: id, text: currentTask.text });
  };

  const submitEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === edit.id ? { ...task, text: edit.text } : task
    );
    setTasks(updatedTasks);
    setEdit({ id: null, text: "" });
  };

  return (
    <div className="bg-slate-950 h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-white text-lg font-semibold ml-2">Todo-List</h1>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-slate-700 rounded shadow-lg ">
        <p className="text-xl font-bold text-white mb-4">
          What are your top priorities for today?
        </p>
        <form onSubmit={handleAddTask} className="flex mb-4">
          <input
            type="text"
            className="border-2 border-gray-200 rounded p-2 flex-grow"
            placeholder="Enter your new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
          >
            Add
          </button>
        </form>
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 ${
                task.completed ? "line-through" : ""
              }`}
            >
              {edit.id === task.id ? (
                <input
                  type="text"
                  className="flex-grow p-2 border rounded"
                  value={edit.text}
                  onChange={handleEditChange}
                  onBlur={submitEditTask}
                />
              ) : (
                <div className="flex-grow flex items-center ">
                  <span
                    className="flex-1 cursor-pointer text-white"
                    style={
                      task.completed
                        ? {
                            textDecoration: "line-through",
                            textDecorationColor: "white",
                          }
                        : {}
                    }
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    • {task.text}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="bg-blue-500 hover:bg-blue-700 mx-2 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
