interface generalProps {
  backendUrl: string;
  setIsLoading?: (boolean: boolean) => void;
}

const useDeleteAllTasks = ({ backendUrl, setIsLoading }: generalProps) => {
  const mutation = async (finishedTasks) => {
    const responseConfirm = confirm("Are you secure of delete all tasks?");

    if (!responseConfirm) return;

    const url = finishedTasks
      ? `${backendUrl}/tasks/finished`
      : `${backendUrl}/tasks`;

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
  };

  return { mutation };
};

export { useDeleteAllTasks };

const useDeleteTask = ({ backendUrl }: generalProps) => {
  const mutation = async (taskId: string) => {
    const responseConfirm = confirm("Are you secure of delete this task?");

    if (!responseConfirm) return;

    await fetch(`${backendUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return { mutation };
};

export { useDeleteTask };
