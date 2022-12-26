import * as React from "react";
import { Layout } from "../../core/Layout/index";
import { useNavigate } from "../../hooks/useNavigate";
import { TeamsPageProps } from "../../components/TeamsPage";
import { TeamCard } from "../../components/TeamCard";
import { ArrowRight } from "../../components/Icons";
import "./styles.css";

export const Teams = ({
  teams,
  backendUrl,
  invitationTeams,
}: TeamsPageProps) => {
  const { navigate } = useNavigate({ basePath: backendUrl });

  return (
    <Layout>
      <h1>Teams</h1>
      {invitationTeams.length > 0 && (
        <div
          className="invitations-card"
          onClick={() => navigate({ to: "teams/invitations" })}
        >
          <p>{`You have ${invitationTeams.length} team invite${
            invitationTeams.length > 1 ? "s" : ""
          }`}</p>
          <p>Go to accept!</p>
          <ArrowRight
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              margin: "1.5rem",
            }}
            width="22"
            height="22"
          />
        </div>
      )}
      <div></div>
      <div className="team-container">
        {teams.map((team) => (
          <React.Fragment key={team.id}>
            <TeamCard team={team} navigate={navigate} />
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};
