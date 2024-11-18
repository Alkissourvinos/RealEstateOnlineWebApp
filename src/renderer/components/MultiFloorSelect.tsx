import { Autocomplete, TextField, Chip, Grid2 } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { propertyFloorMapper } from "../../models/types";

const floorOptions = Object.values(propertyFloorMapper);

const MultiFloorSelect = () => {
  const { control } = useFormContext();

  return (
    <Grid2 container>
      <Controller
        name="propertyFloor"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            multiple
            fullWidth
            options={floorOptions}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            ListboxProps={{
              style: { maxHeight: "20vh" }, // Adjust this value to your needs
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Floors"
                size="medium"
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  size="small"
                  sx={{ mx: "0.4rem" }}
                />
              ))
            }
          />
        )}
      />
    </Grid2>
  );
};

export default MultiFloorSelect;
