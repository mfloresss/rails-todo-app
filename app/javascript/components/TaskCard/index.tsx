import * as React from "react";
import { Task } from "../../interfaces/task";
import "./styles.css";

interface TaskCardProps {
  task: Task;
  navigate: ({ to }) => void;
  deleteTaskMutation: (taskId: string) => void;
}

const TaskCard = ({ task, navigate, deleteTaskMutation }: TaskCardProps) => {
  const handleOnDeleteTask = async () => {
    await deleteTaskMutation(task.id);
  };

  return (
    <div className="task-container">
      <div
        className="task-card"
        onClick={() => navigate({ to: `tasks/${task.id}` })}
      >
        <h2>{task.title}</h2>
        <p>{task.body}</p>
        <p>{task.completed ? "Terminada" : "Por hacer"}</p>
      </div>
      <div className="delete-task-btn" onClick={handleOnDeleteTask}>
        <span>X</span>
      </div>
    </div>
  );
};
export default TaskCard;
