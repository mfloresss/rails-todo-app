import * as React from "react";
import { Tasks } from "../pages/Tasks";
import { TasksPageProps } from "../pages/Tasks";

const TasksPage = ({ tasksFromView, backendUrl }: TasksPageProps) => {
  return <Tasks tasksFromView={tasksFromView} backendUrl={backendUrl} />;
};

export default TasksPage;
