interface generalProps {
  backendUrl: string;
  setIsLoading?: (boolean: boolean) => void;
}

const useDeleteAllTasks = ({ backendUrl, setIsLoading }: generalProps) => {
  const mutation = async () => {
    const responseConfirm = confirm("Are you secure of delete all tasks?");

    if (!responseConfirm) return;

    setIsLoading(true);

    await fetch(`${backendUrl}/tasks`, {
      method: "DELETE",
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
