import * as React from "react";
import { GradientCard } from "../../components/GradientCard";
import { HomeIcon } from "../../components/Icons";
import { InvitationTeam } from "../../interfaces/team";
import { CheckIcon, CloseIcon } from "../Icons";
import "./styles.css";

interface InvitationCardProps {
  invitation: InvitationTeam;
  handdleInvitation: ({ accept, invitationId }) => void;
}

export const InvitationCard = ({
  invitation,
  handdleInvitation,
}: InvitationCardProps) => {
  return (
    <GradientCard>
      <div>
        <HomeIcon width="22" height="22" />
        <p>{invitation.team.name}</p>
      </div>
      <div className="invitation-btn-container">
        <CheckIcon
          width="32"
          height="32"
          style={{ cursor: "pointer" }}
          onClick={() =>
            handdleInvitation({ accept: true, invitationId: invitation.id })
          }
        />
        <CloseIcon
          width="22"
          height="22"
          style={{ cursor: "pointer" }}
          onClick={() =>
            handdleInvitation({ accept: false, invitationId: invitation.id })
          }
        />
      </div>
    </GradientCard>
  );
};
