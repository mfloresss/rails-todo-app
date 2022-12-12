import * as React from "react";
import { Task } from "../../interfaces/task";
import { CloseIcon } from "../Icons";
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
        <div className="header">
          <h2>{task.title}</h2>
        </div>
        <p>{task.body}</p>
      </div>
      <div className="delete-task-btn" onClick={handleOnDeleteTask}>
        <CloseIcon />
      </div>
    </div>
  );
};
export default TaskCard;
