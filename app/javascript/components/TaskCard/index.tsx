import * as React from "react";
import { useEffect } from "react";
import { CloseIcon } from "../Icons";
import { Task } from "../../interfaces/task";
import { GradientCard } from "../GradientCard/index";
import "./styles.css";

interface TaskCardProps {
  task: Task;
  navigate: ({ to }) => void;
  handleOnDeleteTask: (taskId: number) => void;
  gradientColors: any;
  setGradientColors: (prevValue) => void;
}

export interface CardGradientColorsProps {
  firstColor: string;
  secondColor: string;
}

const TaskCard = ({
  task,
  navigate,
  gradientColors,
  setGradientColors,
  handleOnDeleteTask,
}: TaskCardProps) => {
  const handdleOnclick = () => {
    navigate({ to: `teams/${task.team_id}/tasks/${task.id}` });
  };

  const setCardGradientColors = ({ firstColor, secondColor }) => {
    setGradientColors((prevValue) => [
      ...prevValue,
      { taskId: task.id, firstColor, secondColor },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("colorCards", JSON.stringify(gradientColors));
  }, [gradientColors]);

  return (
    <GradientCard
      onClick={handdleOnclick}
      getGradientColor={setCardGradientColors}
    >
      <div className="header">
        <h2>{task.title}</h2>
      </div>
      <p>{task.body}</p>
      <p style={{ textAlign: "end" }}>Created by: {task.author_name} </p>
      {task.comments.length > 0 && (
        <p style={{ textAlign: "end" }}>+{task.comments.length} comments</p>
      )}
      <div
        className="delete-task-btn"
        onClick={async () => await handleOnDeleteTask(task.id)}
      >
        <CloseIcon />
      </div>
    </GradientCard>
  );
};
export default TaskCard;
