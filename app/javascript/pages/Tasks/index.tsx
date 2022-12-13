import * as React from "react";
import { useState } from "react";
import { Layout } from "../../core/Layout/index";
import { TasksList } from "../../components/TasksList/index";
import { useFetchTasks } from "../../hooks/queries/tasks";
import { useDeleteAllTasks } from "../../hooks/mutations/tasks";
import { useDeleteTask } from "../../hooks/mutations/tasks";
import { useNavigate } from "../../hooks/useNavigate";
import "./styles.css";
import { BottomBar } from "../../components/BottomBar";
import { Task } from "../../interfaces/task";

export interface TasksPageProps {
  backendUrl: string;
  tasksFromView: Task[];
}

const Tasks = ({ tasksFromView, backendUrl }: TasksPageProps) => {
  const [tasks, setTasks] = useState<Task[] | []>(tasksFromView || []);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate, currentPath } = useNavigate({ basePath: backendUrl });

  const isFinishedPage = currentPath.includes("finished");

  const { fetchTasks } = useFetchTasks({
    backendUrl,
    setIsLoading,
    setTasks,
  });

  const { mutation: deleteAllTasksMutation } = useDeleteAllTasks({
    backendUrl,
    setIsLoading,
  });

  const { mutation: deleteTaskMutation } = useDeleteTask({
    backendUrl,
  });

  const handleOnDeleteAllTask = async () => {
    await deleteAllTasksMutation(isFinishedPage);
    await fetchTasks(isFinishedPage);
  };

  const handleOnDeleteTask = async (taskId) => {
    await deleteTaskMutation(taskId);
    await fetchTasks(isFinishedPage);
  };

  return (
    <Layout isLoading={isLoading}>
      <h1>{isFinishedPage ? "Finished" : "To-do"}</h1>
      {tasks.length > 0 && (
        <>
          <div className="task-dashboard-menu">
            <button onClick={handleOnDeleteAllTask}>Delete all task</button>
          </div>
          <TasksList
            tasks={tasks}
            navigate={navigate}
            handleOnDeleteTask={handleOnDeleteTask}
          />
        </>
      )}
      <BottomBar backendUrl={backendUrl} />
    </Layout>
  );
};
export { Tasks };
