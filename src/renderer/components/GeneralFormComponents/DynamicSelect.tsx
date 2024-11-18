import { Grid2, GridSize, MenuItem, SxProps } from "@mui/material";
import RHFTextField from "../RHFTextfield";
import { ReactNode } from "react";
import HeaderWithIcon from "./HeaderWithIcon";
import { ResponsiveSize } from "../../../models/types";

type Props = {
  headerLabel?: string;
  headerIcon?: ReactNode;
  name: string;
  textfieldLabel: string;
  placeholderText?: string;
  customSize: ResponsiveSize | GridSize;
  optionsArray: string[];
  disabled?: boolean;
  sx?: SxProps;
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
      {headerLabel && (
        <HeaderWithIcon headerLabel={headerLabel} headerIcon={headerIcon} />
      )}

      <Grid2 container>
        <RHFTextField
          name={name}
          label={textfieldLabel}
          placeholder={placeholderText ? placeholderText : ""}
          size="small"
          select
          fullWidth
          disabled={disabled}
        >
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
