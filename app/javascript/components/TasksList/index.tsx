import * as React from "react";
import TaskCard from "../TaskCard/index";
import { Task } from "../../interfaces/task";
import { useState } from "react";
import "./styles.css";

interface TasksListProps {
  tasks: Task[];
  navigate: ({ to }) => void;
  handleOnDeleteTask: (taskId: number) => void;
}

const TasksList = ({ tasks, navigate, handleOnDeleteTask }: TasksListProps) => {
  const [gradientColors, setGradientColors] = useState([]);

  return (
    <div className="tasks-container">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          navigate={navigate}
          gradientColors={gradientColors}
          setGradientColors={setGradientColors}
          handleOnDeleteTask={handleOnDeleteTask}
        />
      ))}
    </div>
  );
};
export { TasksList };
