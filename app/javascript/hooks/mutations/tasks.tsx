import { Team } from "../../interfaces/team";

interface generalProps {
  team: Team;
  backendUrl: string;
  setIsLoading?: (boolean: boolean) => void;
}

const useDeleteAllTasks = ({
  team,
  backendUrl,
  setIsLoading,
}: generalProps) => {
  const mutation = async (finishedTasks, fetchTasksCallback) => {
    const responseConfirm = confirm("Are you secure of delete all tasks?");

    if (!responseConfirm) return;

    const url = finishedTasks
      ? `${backendUrl}/teams/${team.id}/tasks/finished`
      : `${backendUrl}/teams/${team.id}/tasks`;

    setIsLoading(true);

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        finishedTasks &&
        JSON.stringify({
          finished: true,
        }),
    });

    setIsLoading(false);

    await fetchTasksCallback();
  };

  return { mutation };
};

export { useDeleteAllTasks };

const useDeleteTask = ({ team, backendUrl }: generalProps) => {
  const mutation = async (taskId: string) => {
    const responseConfirm = confirm("Are you secure of delete this task?");

    if (!responseConfirm) return;

    await fetch(`${backendUrl}/teams/${team.id}/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return { mutation };
};

export { useDeleteTask };
