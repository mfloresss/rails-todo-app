import * as React from "react";
import { useState } from "react";
import { Layout } from "../../core/Layout/index";
import { TasksList } from "../../components/TasksList/index";
import { useFetchTasks } from "../../hooks/queries/tasks";
import { useDeleteAllTasks } from "../../hooks/mutations/tasks";
import { useDeleteTask } from "../../hooks/mutations/tasks";
import { useNavigate } from "../../hooks/useNavigate";
import { Task } from "../../interfaces/task";
import { Team } from "../../interfaces/team";
import { Menu } from "../../components/Menu";
import { AddIcon, HamburgerIcon } from "../../components/Icons";
import "./styles.css";

export interface TasksPageProps {
  team: Team;
  backendUrl: string;
  tasksFromView: Task[];
}

const Tasks = ({ team, tasksFromView, backendUrl }: TasksPageProps) => {
  const [tasks, setTasks] = useState<Task[] | []>(tasksFromView || []);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { navigate, currentPath } = useNavigate({ basePath: backendUrl });

  const isFinishedPage = currentPath.includes("finished");

  const { fetchTasks } = useFetchTasks({
    team,
    backendUrl,
    setIsLoading,
    setTasks,
  });

  const { mutation: deleteAllTasksMutation } = useDeleteAllTasks({
    team,
    backendUrl,
    setIsLoading,
  });

  const { mutation: deleteTaskMutation } = useDeleteTask({
    team,
    backendUrl,
  });

  const handleOnDeleteAllTask = async () => {
    const fetchTasksCallback = async () => await fetchTasks(isFinishedPage);

    await deleteAllTasksMutation(isFinishedPage, fetchTasksCallback);
  };

  const handleOnDeleteTask = async (taskId) => {
    await deleteTaskMutation(taskId);
    await fetchTasks(isFinishedPage);
  };

  return (
    <Layout isLoading={isLoading}>
      <div className="header">
        <h1>{isFinishedPage ? "Finished" : "Ongoing"}</h1>
        <HamburgerIcon
          width="32"
          height="32"
          onClick={() => setShowMenu(true)}
        />
      </div>
      {tasks.length > 0 && (
        <>
          <div className="submenu-task">
            <button onClick={handleOnDeleteAllTask}>Delete all task</button>
          </div>
          <TasksList
            tasks={tasks}
            navigate={navigate}
            handleOnDeleteTask={handleOnDeleteTask}
          />
        </>
      )}
      <Menu
        team={team}
        backendUrl={backendUrl}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      {!isFinishedPage && (
        <FloatingButton
          onClick={() => navigate({ to: `teams/${team.id}/tasks/new` })}
        />
      )}
    </Layout>
  );
};
export { Tasks };

export const FloatingButton = ({ ...rest }) => {
  return (
    <button
      style={{
        width: "3rem",
        height: "3rem",
        position: "fixed",
        bottom: 0,
        right: 0,
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px 10%",
        background: "#000",
      }}
      {...rest}
    >
      <AddIcon color="#fff" />
    </button>
  );
};
