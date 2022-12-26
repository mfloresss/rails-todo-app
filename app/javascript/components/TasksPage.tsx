import * as React from "react";
import { Tasks } from "../pages/Tasks";
import { TasksPageProps } from "../pages/Tasks";

const TasksPage = ({ team, tasksFromView, backendUrl }: TasksPageProps) => {
  return (
    <Tasks team={team} tasksFromView={tasksFromView} backendUrl={backendUrl} />
  );
};

export default TasksPage;
