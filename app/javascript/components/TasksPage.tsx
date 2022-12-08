import * as React from "react";
import { Tasks } from "../pages/Tasks";
import { TasksPageProps } from "../pages/Tasks";

const TasksPage = ({ backendUrl }: TasksPageProps) => {
  return <Tasks backendUrl={backendUrl} />;
};

export default TasksPage;
