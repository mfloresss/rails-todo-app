import { Task } from "../../interfaces/task";
import { Team } from "../../interfaces/team";

interface useFetchTasks {
  team: Team;
  backendUrl: string;
  setTasks: (tasks: Task[] | []) => void;
  setIsLoading: (boolean: boolean) => void;
}

const useFetchTasks = ({
  team,
  backendUrl,
  setIsLoading,
  setTasks,
}: useFetchTasks) => {
  const fetchTasks = async (finishedTasks) => {
    const url = finishedTasks
      ? `${backendUrl}/teams/${team.id}/tasks/finished.json`
      : `${backendUrl}/teams/${team.id}/tasks.json`;

    setIsLoading(true);

    const response = await fetch(url);
    const tasks: Task[] | [] = await response.json();

    setTasks(tasks);
    setIsLoading(false);
  };

  return { fetchTasks };
};

export { useFetchTasks };
