import * as React from "react";
import { useEffect, useState } from "react";
import { Layout } from "../../core/Layout/index";
import { TasksList } from "../../components/TasksList/index";
import { useFetchTasks } from "../../hooks/queries/tasks";
import { useDeleteAllTasks } from "../../hooks/mutations/tasks";
import { useDeleteTask } from "../../hooks/mutations/tasks";
import { useNavigate } from "../../hooks/useNavigate";
import "./styles.css";

export interface TasksPageProps {
  backendUrl: string;
}

const Tasks = ({ backendUrl }: TasksPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigate({ basePath: backendUrl });

  const { fetchTasks, tasks } = useFetchTasks({
    backendUrl,
    setIsLoading,
  });

  const { mutation: deleteAllTasksMutation } = useDeleteAllTasks({
    backendUrl,
    setIsLoading,
  });

  const { mutation: deleteTaskMutation } = useDeleteTask({
    backendUrl,
  });

  useEffect(() => {
    (async () => {
      await fetchTasks();
    })();
  }, []);

  const handleOnDeleteAllTask = async () => {
    await deleteAllTasksMutation();
    await fetchTasks();
  };

  return (
    <Layout isLoading={isLoading}>
      <h1>Tasks</h1>
      {tasks.length > 0 && (
        <>
          <div className="task-dashboard-menu">
            <button onClick={handleOnDeleteAllTask}>Delete all task</button>
          </div>
          <TasksList
            tasks={tasks}
            navigate={navigate}
            deleteTaskMutation={deleteTaskMutation}
          />
        </>
      )}
      <button
        className="add-task-btn"
        onClick={() =>
          navigate({
            to: "tasks/new",
          })
        }
      >
        +
      </button>
    </Layout>
  );
};
export { Tasks };
