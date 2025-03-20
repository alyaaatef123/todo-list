import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function Home() {
  return (
    <div>
      <h1>Welcome to the To-Do List App</h1>
      <Link to="/tasks">View Tasks</Link>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (!newTask) return;
    const task = { id: tasks.length + 1, title: newTask };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setEditingText(task.title);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: editingText } : task))
    );
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveTask(task.id)}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/tasks">Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
