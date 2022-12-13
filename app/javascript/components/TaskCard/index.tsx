import * as React from "react";
import { Task } from "../../interfaces/task";
import { CloseIcon } from "../Icons";
import "./styles.css";

interface TaskCardProps {
  task: Task;
  navigate: ({ to }) => void;
  handleOnDeleteTask: (taskId: string) => void;
}

const TaskCard = ({ task, navigate, handleOnDeleteTask }: TaskCardProps) => {
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
      <div
        className="delete-task-btn"
        onClick={async () => await handleOnDeleteTask(task.id)}
      >
        <CloseIcon />
      </div>
    </div>
  );
};
export default TaskCard;
