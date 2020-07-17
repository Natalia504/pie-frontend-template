import React from "react";
import { Typography } from "@material-ui/core";

export interface LayoutProps {
  header?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  header = "App Header",
  children
}) => (
  <div>
    <Typography>{header}</Typography>
    {children}
  </div>
);
