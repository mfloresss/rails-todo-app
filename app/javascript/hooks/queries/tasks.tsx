import { useState } from "react";
import { Task } from "../../interfaces/task";

interface useFetchTasks {
  backendUrl: string;
  setIsLoading: (boolean: boolean) => void;
}

const useFetchTasks = ({ backendUrl, setIsLoading }: useFetchTasks) => {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  const fetchTasks = async () => {
    setIsLoading(true);

    const response = await fetch(`${backendUrl}/tasks.json`);
    const tasks: Task[] = await response.json();

    setTasks(tasks);
    setIsLoading(false);
  };

  return { fetchTasks, tasks };
};

export { useFetchTasks };
