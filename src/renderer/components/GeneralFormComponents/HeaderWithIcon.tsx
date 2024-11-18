import { Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  headerLabel: string;
  headerIcon?: ReactNode;
};
const HeaderWithIcon = ({ headerLabel, headerIcon }: Props) => {
  return (
    <Grid2 container sx={{ mb: "1rem", minHeight: "24px" }}>
      <span
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginRight: "0.2rem",
        }}
      >
        {headerIcon && headerIcon}
      </span>
      <Grid2 sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" noWrap>
          {headerLabel}
        </Typography>
      </Grid2>
    </Grid2>
  );
};
export default HeaderWithIcon;
