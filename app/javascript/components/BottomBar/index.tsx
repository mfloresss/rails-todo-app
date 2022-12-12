import * as React from "react";
import { useNavigate } from "../../hooks/useNavigate";
import { AddIcon, ArchiveIcon, HomeIcon, SettingIcon } from "../Icons";
import "./styles.css";

export interface BottomBarProps {
  backendUrl: string;
}

const BottomBar = ({ backendUrl }: BottomBarProps) => {
  const { navigate, currentPath } = useNavigate({ basePath: backendUrl });

  return (
    <div className="bottom-bar-container">
      {currentPath === "/" ? (
        <button
          className="archived-tasks-btn bottom-bar-btn"
          onClick={() =>
            navigate({
              to: "tasks/archived",
            })
          }
        >
          <ArchiveIcon width="22" height="22" />
        </button>
      ) : (
        <button
          className="home-tasks-btn bottom-bar-btn"
          onClick={() =>
            navigate({
              to: "",
            })
          }
        >
          <HomeIcon width="22" height="22" />
        </button>
      )}
      <button
        className="add-task-btn bottom-bar-btn"
        onClick={() =>
          navigate({
            to: "tasks/new",
          })
        }
      >
        <AddIcon width="30" height="30" />
      </button>
      <button
        className="settings-btn bottom-bar-btn"
        onClick={() =>
          navigate({
            to: "settings",
          })
        }
      >
        <SettingIcon width="22" height="22" />
      </button>
    </div>
  );
};

export { BottomBar };
