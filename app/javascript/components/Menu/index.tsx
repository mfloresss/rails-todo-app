import * as React from "react";
import { Team } from "../../interfaces/team";
import { Modal } from "../Modal";
import { MenuButton } from "./MenuButton";
import { useNavigate } from "../../hooks/useNavigate";
import "./styles.css";

interface MenuProps {
  team: Team;
  backendUrl: string;
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
}

export const Menu = ({
  team,
  showMenu,
  setShowMenu,
  backendUrl,
}: MenuProps) => {
  const { navigate, currentPath } = useNavigate({ basePath: backendUrl });

  const PATHS = {
    TEAMS: "teams",
    SETTINGS: "settings",
    FINISHED_TASKS: (team) => `teams/${team.id}/tasks/finished`,
    TASKS: (team) => `teams/${team.id}/tasks`,
    INVITE: (team) => `teams/${team.id}/invite`,
    LOGOUT: "/logout",
  };

  const modalStyles = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const isFinishedPage = currentPath.includes("finished");

  return (
    <Modal
      isOpen={showMenu}
      setIsOpen={setShowMenu}
      additionalStyles={modalStyles}
    >
      <div className="options-menu-modal-container">
        <MenuButton
          icon="TEAM"
          name="My teams"
          onClick={() => navigate({ to: PATHS.TEAMS })}
        />
        {isFinishedPage ? (
          <MenuButton
            icon="LIST"
            name="Ongoing tasks"
            onClick={() => navigate({ to: PATHS.TASKS(team) })}
          />
        ) : (
          <MenuButton
            icon="CHECK"
            name="Finished tasks"
            onClick={() => navigate({ to: PATHS.FINISHED_TASKS(team) })}
          />
        )}
        <MenuButton
          icon="INVITE"
          name="Invite to team"
          onClick={() => navigate({ to: PATHS.INVITE(team) })}
        />
        <div className="bottom-buttons">
          <MenuButton
            icon="LOGOUT"
            name="Logout"
            onClick={() => navigate({ to: PATHS.LOGOUT })}
          />
          <MenuButton
            icon="PROFILE"
            onClick={() => navigate({ to: PATHS.SETTINGS })}
          />
        </div>
      </div>
    </Modal>
  );
};
