import * as React from "react";
import { Invitations, InvitationsPageProps } from "../pages/Teams/Invitations";

const InvitationsTeamsPage = ({
  invitations,
  backendUrl,
}: InvitationsPageProps) => {
  return <Invitations invitations={invitations} backendUrl={backendUrl} />;
};

export default InvitationsTeamsPage;
