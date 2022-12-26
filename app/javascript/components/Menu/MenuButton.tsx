import * as React from "react";
import * as Icons from "../Icons";

interface MenuButtonProps {
  icon: string;
  name?: string;
}

export const MenuButton = ({
  icon,
  name,
  ...rest
}: MenuButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
  const MENU_ICONS_ENUM = {
    TEAM: <Icons.PeopleIcon />,
    CHECK: <Icons.CheckIcon />,
    LIST: <Icons.ListIcon />,
    PROFILE: <Icons.PersonIcon />,
    LOGOUT: <Icons.ArrowLeft />,
    INVITE: <Icons.InvitePersonIcon />,
  };

  const styles = name
    ? {
        width: "fit-content",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }
    : {
        cursor: "pointer",
      };

  return (
    <div style={styles} {...rest}>
      {MENU_ICONS_ENUM[icon]}
      {name && <p>{name}</p>}
    </div>
  );
};
