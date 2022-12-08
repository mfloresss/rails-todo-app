import * as React from "react";
import TaskCard from "../TaskCard/index";
import { Task } from "../../interfaces/task";
import "./styles.css";

interface TasksListProps {
  tasks: Task[];
  navigate: ({ to }) => void;
  deleteTaskMutation: (taskId: string) => void;
}

const TasksList = ({ tasks, navigate, deleteTaskMutation }: TasksListProps) => {
  return (
    <div className="tasks-container">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          navigate={navigate}
          deleteTaskMutation={deleteTaskMutation}
        />
      ))}
    </div>
  );
};
export { TasksList };
