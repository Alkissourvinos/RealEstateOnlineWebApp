import { Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  headerLabel: string; // Text to display in header
  headerIcon?: ReactNode; // Optional icon component
};

// Component that displays a header with an optional icon
const HeaderWithIcon = ({ headerLabel, headerIcon }: Props) => {
  return (
    <Grid2 container sx={{ mb: "1rem", minHeight: "24px" }}>
      {/* Icon container */}
      <span
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginRight: "0.2rem",
        }}
      >
        {headerIcon && headerIcon}
      </span>

      {/* Header text */}
      <Grid2 sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" noWrap>
          {headerLabel}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default HeaderWithIcon;
