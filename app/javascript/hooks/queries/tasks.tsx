import { useState } from "react";
import { Task } from "../../interfaces/task";

interface useFetchTasks {
  backendUrl: string;
  setTasks: (tasks: Task[] | []) => void;
  setIsLoading: (boolean: boolean) => void;
}

const useFetchTasks = ({
  backendUrl,
  setIsLoading,
  setTasks,
}: useFetchTasks) => {
  const fetchTasks = async (finishedTasks) => {
    const url = finishedTasks
      ? `${backendUrl}/tasks/finished.json`
      : `${backendUrl}/tasks.json`;

    setIsLoading(true);

    const response = await fetch(url);
    const tasks: Task[] | [] = await response.json();

    setTasks(tasks);
    setIsLoading(false);
  };

  return { fetchTasks };
};

export { useFetchTasks };
