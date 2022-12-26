import * as React from "react";
import { Team } from "../../interfaces/team";
import { HomeIcon } from "../Icons";
import { GradientCard } from "../GradientCard";
import "./styles.css";

interface TeamCardProps {
  team: Team;
  navigate: ({ to }) => void;
}

export const TeamCard = ({
  team,
  navigate,
}: TeamCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <GradientCard onClick={() => navigate({ to: `teams/${team.id}/tasks` })}>
      <HomeIcon width="22" height="22" />
      <p>{team.name}</p>
    </GradientCard>
  );
};
