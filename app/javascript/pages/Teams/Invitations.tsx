import * as React from "react";
import { Layout } from "../../core/Layout";
import { InvitationTeam } from "../../interfaces/team";
import { InvitationCard } from "../../components/InvitationCard.tsx";

export interface InvitationsPageProps {
  invitations: InvitationTeam[];
  backendUrl: string;
}

export const Invitations = ({
  invitations,
  backendUrl,
}: InvitationsPageProps) => {
  const handdleInvitation = async ({ invitationId, accept }) => {
    const url = accept
      ? `${backendUrl}/teams/invitations/${invitationId}/accept`
      : `${backendUrl}/teams/invitations/${invitationId}/decline
      `;

    try {
      await fetch(url, {
        method: accept ? "PATCH" : "DELETE",
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div
        className="header"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          className="back-btn"
          style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: "#000",
            borderRadius: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#ffff"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </div>
        <h1>Invitations</h1>
      </div>
      {invitations.length > 0 && (
        <div className="invitations-container" style={{ marginTop: "40px" }}>
          {invitations.map((invitation) => (
            <React.Fragment key={invitation.id}>
              <InvitationCard
                invitation={invitation}
                handdleInvitation={handdleInvitation}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </Layout>
  );
};
