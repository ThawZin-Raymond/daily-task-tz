import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [edit, setEdit] = useState({ id: null, text: ''});

  


  return (
    <div>
      <h1 className="font-Madimi text-3xl">ToDoList</h1>
    </div>
  );
};

export default TodoList;
