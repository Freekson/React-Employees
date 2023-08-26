import React from "react";
import { useCurrentQuery } from "../../redux/services/auth";

export const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <span>Loading</span>;
  }
  return children;
};
