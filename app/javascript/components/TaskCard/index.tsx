import * as React from "react";
import { Task } from "../../interfaces/task";
import { CloseIcon } from "../Icons";
import "./styles.css";

interface TaskCardProps {
  task: Task;
  navigate: ({ to }) => void;
  handleOnDeleteTask: (taskId: number) => void;
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
        <p style={{ textAlign: "end" }}>Created by: {task.author_name} </p>
        {task.comments.length > 0 && (
          <p style={{ textAlign: "end" }}>+{task.comments.length} comments</p>
        )}
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
