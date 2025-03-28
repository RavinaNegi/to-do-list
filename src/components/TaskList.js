// TaskList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../redux/store";
import { updateTask } from "../redux/store";



const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const sortedTasks = tasks.slice().sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul className="p-4">
      {sortedTasks.map((task) => (
        <li key={task.id} className="flex justify-between p-2 border-b">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              dispatch(updateTask({ id: task.id, completed: !task.completed }))
            }
          />
          <span>{task.text} ({task.priority})</span>
          <button
            onClick={() => dispatch(removeTask(task.id))}
            className="bg-red-500 text-white p-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
