// Form and Material-UI imports
import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

// Component props interface
interface IProps {
  name: string;
  clearErrorsOnChange?: boolean;
  autoFocus?: boolean;
  allowError?: boolean;
}

export default function RHFTextField({
  name,
  clearErrorsOnChange,
  type,
  defaultValue,
  autoFocus,
  allowError = true,
  ...other
}: IProps & TextFieldProps) {
  const { control, clearErrors } = useFormContext();

  // Handle input changes based on type
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    // Convert to number if type is number, otherwise use string value
    type === "number"
      ? field.onChange(parseInt(e.target.value) || 0)
      : field.onChange(e.target.value);

    // Clear field errors if enabled and has value
    if (clearErrorsOnChange && e.target.value) {
      clearErrors(name);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          inputRef={(input) => input && autoFocus && input.focus()}
          {...field}
          fullWidth
          type={type}
          error={!!error}
          helperText={allowError ? error?.message : undefined}
          onWheel={(event: any) => type === "number" && event.target.blur()}
          onChange={(e) => handleChange(e, field)}
          {...other}
          defaultValue={defaultValue}
        />
      )}
    />
  );
}
