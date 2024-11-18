import { Grid2, GridSize, MenuItem, SxProps } from "@mui/material";
import RHFTextField from "../RHFTextfield";
import { ReactNode } from "react";
import HeaderWithIcon from "./HeaderWithIcon";
import { ResponsiveSize } from "../../../models/types";

// Props for configurable select dropdown with header
type Props = {
  headerLabel?: string; // Optional label above select
  headerIcon?: ReactNode; // Optional icon next to header
  name: string; // Form field name
  textfieldLabel: string; // Label for select field
  placeholderText?: string; // Placeholder text
  customSize: ResponsiveSize | GridSize; // Control width of container
  optionsArray: string[]; // Array of select options
  disabled?: boolean; // Disable select field
  sx?: SxProps; // Additional styles
};

const DynamicSelect = ({
  headerLabel,
  headerIcon,
  name,
  textfieldLabel,
  placeholderText,
  customSize,
  optionsArray,
  disabled = false,
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
          label={textfieldLabel}
          placeholder={placeholderText ?? ""}
          size="small"
          select
          fullWidth
          disabled={disabled}
        >
          {/* Map options to MenuItem components */}
          {optionsArray.map((adType) => (
            <MenuItem key={adType} value={adType}>
              {adType}
            </MenuItem>
          ))}
        </RHFTextField>
      </Grid2>
    </Grid2>
  );
};

export default DynamicSelect;
