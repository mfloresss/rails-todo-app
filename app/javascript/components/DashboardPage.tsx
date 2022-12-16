import * as React from "react";
import { Dashboard } from "./Dashboard";
import { User } from "../interfaces/user";

export interface DashboardPagePageProps {
  user: User;
  backendUrl: string;
}

const DashboardPage = ({ user, backendUrl }: DashboardPagePageProps) => {
  return <Dashboard user={user} backendUrl={backendUrl} />;
};

export default DashboardPage;
