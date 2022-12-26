import * as React from "react";
import { FallbackScreen } from "../../components/FallbackScreen/index";
import "./styles.css";

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Layout = ({ children, isLoading }: LayoutProps) => {
  if (isLoading) return <FallbackScreen />;

  return <div className="layout">{children}</div>;
};

export { Layout };
