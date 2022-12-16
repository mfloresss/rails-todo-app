import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../core/Layout/index";
import { TasksList } from "../../components/TasksList/index";
import { useFetchTasks } from "../../hooks/queries/tasks";
import { useDeleteAllTasks } from "../../hooks/mutations/tasks";
import { useDeleteTask } from "../../hooks/mutations/tasks";
import { useNavigate } from "../../hooks/useNavigate";
import BottomBar from "../../components/BottomBar";
import { Task } from "../../interfaces/task";
import { DashboardPagePageProps } from "../DashboardPage";
import "./styles.css";
import { HomeIcon } from "../Icons";

export const Dashboard = ({ user, backendUrl }: DashboardPagePageProps) => {
  console.log(user);
  const [tasks, setTasks] = useState<Task[] | []>([]);
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

  useEffect(() => {
    const { id: userId } = user;

    (async () => {
      const tasks = await fetch(`${backendUrl}/users/${userId}/tasks.json`);
      setTasks(await tasks.json());
    })();
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <h1>Teams</h1>
      <div className="team-container">
        {user.teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            onClick={() => navigate({ to: `team/${team.id}/tasks` })}
          >
            <HomeIcon width="22" height="22" />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};
