import { Grid2, GridSize, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { ResponsiveSize } from "../../../models/types";
import RHFTextField from "../RHFTextfield";
import HeaderWithIcon from "./HeaderWithIcon";

// Props for configurable text input with optional header
type Props = {
  headerLabel?: string; // Optional label above input
  headerIcon?: ReactNode; // Optional icon next to header
  name: string; // Form field name
  textfieldLabel?: string; // Label for input field
  placeholderText?: string; // Placeholder text
  customSize: ResponsiveSize | GridSize; // Control width of container
  type?: "text" | "number"; // Input type
  multiLine?: boolean; // Enable multiline input
  rows?: number; // Fixed number of rows
  maxRows?: number; // Maximum rows for multiline
  sx?: SxProps; // Additional styles
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
      {/* Optional header with icon */}
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
          {...(rows ? { rows } : { maxRows })} // Set either fixed or max rows
          type={type}
          InputProps={{
            // Add min/step props for number inputs
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
