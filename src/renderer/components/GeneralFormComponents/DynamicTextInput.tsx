import { Grid2, GridSize, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { ResponsiveSize } from "../../../models/types";
import RHFTextField from "../RHFTextfield";
import HeaderWithIcon from "./HeaderWithIcon";

type Props = {
  headerLabel?: string;
  headerIcon?: ReactNode;
  name: string;
  textfieldLabel?: string;
  placeholderText?: string;
  customSize: ResponsiveSize | GridSize;
  type?: "text" | "number";
  multiLine?: boolean;
  rows?: number;
  maxRows?: number;
  sx?: SxProps;
};

const DynamicTextInput = ({
  headerLabel,
  headerIcon,
  name,
  textfieldLabel,
  placeholderText,
  customSize,
  type = "text",
  multiLine = false,
  rows,
  maxRows,
  sx,
}: Props) => {
  return (
    <Grid2 size={customSize} sx={{ mb: "0.5rem", ...sx }}>
      {headerLabel && (
        <HeaderWithIcon headerLabel={headerLabel} headerIcon={headerIcon} />
      )}

      <Grid2 container>
        <RHFTextField
          name={name}
          label={textfieldLabel || ""}
          placeholder={placeholderText || ""}
          size="small"
          fullWidth
          multiline={multiLine}
          {...(rows ? { rows: rows } : { maxRows: maxRows })}
          type={type}
          InputProps={{
            ...(type === "number" && {
              inputProps: {
                min: 0,
                step: 1,
              },
            }),
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default DynamicTextInput;
