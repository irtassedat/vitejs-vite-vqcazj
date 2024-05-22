import React, { useState, ChangeEvent } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 0, text: 'Convert App to TypeScript', completed: false },
  ]);
  const [taskInput, setTaskInput] = useState<string>('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>WiT ToDo List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={handleInputChange}
        placeholder="Enter a task"
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />
      <button onClick={addTask} style={{ marginTop: '10px', width: '100%' }}>
        Add Task
      </button>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center',
              padding: '10px 0',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
