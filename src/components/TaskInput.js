// TaskInput.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/store";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      dispatch(addTask({ id: Date.now(), text: task, priority }));
      setTask("");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 w-full"
        placeholder="Enter a task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full mt-2">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
