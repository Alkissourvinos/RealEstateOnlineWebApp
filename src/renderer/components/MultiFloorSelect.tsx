// Import necessary components from Material-UI and React Hook Form
import { Autocomplete, TextField, Chip, Grid2 } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { propertyFloorMapper } from "../../models/types";

// Convert the propertyFloorMapper object values into an array for options
const floorOptions = Object.values(propertyFloorMapper);

const MultiFloorSelect = () => {
  // Get the form control from React Hook Form context
  const { control } = useFormContext();

  return (
    // Grid container for layout management
    <Grid2 container>
      {/* Controller component from React Hook Form to manage form state */}
      <Controller
        name="propertyFloor" // Form field name
        control={control}
        defaultValue={[]} // Initialize with empty array
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          // Material-UI Autocomplete component for multiple selection
          <Autocomplete
            multiple // Enable multiple selection
            fullWidth
            options={floorOptions}
            value={value}
            // Handle selection changes and update form state
            onChange={(_, newValue) => onChange(newValue)}
            ListboxProps={{
              style: { maxHeight: "20vh" }, // Limit dropdown height
            }}
            // Render the input field
            renderInput={(params) => (
              <TextField
                {...params}
                label="Floors"
                size="medium"
                error={!!error} // Show error state if validation fails
                helperText={error?.message} // Display error message
                fullWidth
              />
            )}
            // Custom rendering of selected items as chips
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  size="small"
                  sx={{ mx: "0.4rem" }} // Add horizontal margin to chips
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
