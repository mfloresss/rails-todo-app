import * as React from "react";
import { Teams } from "../pages/Teams";
import { InvitationTeam, Team } from "../interfaces/team";

export interface TeamsPageProps {
  teams: Team[];
  backendUrl: string;
  invitationTeams: InvitationTeam[];
}

const TeamsPage = ({ teams, backendUrl, invitationTeams }: TeamsPageProps) => {
  return (
    <Teams
      teams={teams}
      invitationTeams={invitationTeams}
      backendUrl={backendUrl}
    />
  );
};

export default TeamsPage;
