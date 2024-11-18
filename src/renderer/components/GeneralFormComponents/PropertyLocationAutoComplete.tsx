/* eslint-disable react-hooks/exhaustive-deps */
import { debounce, isEmpty } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  alpha,
  Box,
  FormHelperText,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Clear, Info, Search, SearchOff } from "@mui/icons-material";
import { ErrorMessage } from "@hookform/error-message";
import { getLocationSuggestions } from "../../../controller/locations";

// Type definition for location suggestions returned from API
interface APISuggestions {
  placeId: string; // Unique identifier for the location
  mainText: string; // Primary address line
  secondaryText: string; // Secondary address details
}

const PropertyLocationAutoComplete = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const [gMapsSuggestionsArray, setGMapsSuggestionArray] = useState<
    APISuggestions[]
  >([]);

  // Access form context from react-hook-form
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  // Watch for changes in form fields
  const watchedSelecteTextfieldLocation = useWatch({
    name: "locationTextfieldName",
  });
  const watchedSelectedPlaceID = useWatch({ name: "placeID" });

  // Debounced API call to prevent excessive requests
  // Only triggers after 500ms of user inactivity
  const debouncedFetch = useCallback(
    debounce((value: string) => {
      setLoading(true);
      getLocationSuggestions(value)
        .then((response) => {
          setGMapsSuggestionArray(response);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setGMapsSuggestionArray([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500),
    []
  );

  // Handle user input in search field
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValue("locationTextfieldName", value);

      // Only fetch suggestions if user has typed at least 3 characters
      if (value.length >= 3) {
        setLoading(true);
        debouncedFetch(value);
      } else {
        setLoading(false);
      }
    },
    [setValue, debouncedFetch]
  );

  // Handle selection of a suggestion from the dropdown
  const handleSuggestionClick = useCallback((suggestion: APISuggestions) => {
    // Update multiple form fields with selected location data
    setValue(
      "locationTextfieldName",
      `${suggestion.mainText}, ${suggestion.secondaryText}`,
      { shouldValidate: true }
    );
    setValue("placeID", suggestion.placeId, { shouldValidate: true });
    setValue("primaryAddress", suggestion.mainText);
    setValue("secondaryAddress", suggestion.secondaryText);
  }, []);

  // Clear all location-related form fields
  const handleClearInput = () => {
    setValue("locationTextfieldName", "");
    setValue("placeID", "");
    setValue("primaryAddress", "");
    setValue("secondaryAddress", "");
    setLoading(false);
    setGMapsSuggestionArray([]);
  };

  return (
    <Grid2 size={{ xs: 12 }}>
      <Box sx={{ position: "relative" }}>
        {/* Main search input field */}
        <TextField
          size="small"
          fullWidth
          label="Find your Property with its Address"
          placeholder="i.e Alexandras 122"
          value={watchedSelecteTextfieldLocation}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <>
                {watchedSelecteTextfieldLocation.length > 0 ? (
                  <IconButton edge="end" onClick={handleClearInput}>
                    <Clear />
                  </IconButton>
                ) : (
                  <Search />
                )}
              </>
            ),
          }}
          error={
            !isEmpty(errors?.locationTextfieldName) || !isEmpty(errors?.placeID)
          }
        />

        {/* Error message display */}
        {!isEmpty(errors?.locationTextfieldName) && (
          <FormHelperText error>
            <ErrorMessage name="locationTextfieldName" errors={errors} />
          </FormHelperText>
        )}
        {isEmpty(errors?.locationTextfieldName) &&
          !isEmpty(errors?.placeID) && (
            <FormHelperText error>
              <ErrorMessage name="placeID" errors={errors} />
            </FormHelperText>
          )}

        {/* Suggestions dropdown - only shows when there's input and no place selected */}
        {watchedSelecteTextfieldLocation.length > 0 &&
          isEmpty(watchedSelectedPlaceID) && (
            <Paper
              variant="elevation"
              elevation={10}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 99,
              }}
            >
              <List
                sx={{
                  maxHeight: "350px",
                  overflow: "auto",
                  bgcolor: "background.paper",
                  border: "1px solid #1976d2",
                  borderTopWidth: "0px",
                  borderRadius: "10px",
                  borderTop: "none",
                }}
              >
                {/* Loading state */}
                {loading ? (
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "350px",
                      overflow: "hidden",
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rounded"
                        width="100%"
                        height={50}
                        sx={{ mx: "8px", my: "4px" }}
                      />
                    ))}
                  </ListItem>
                ) : watchedSelecteTextfieldLocation.length < 3 ? (
                  // Message when input is too short
                  <ListItem>
                    <Info sx={{ mr: 1, color: "primary.main" }} />
                    <ListItemText
                      primary="Enter at least 3 characters to see suggestions"
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: "text.secondary",
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </ListItem>
                ) : gMapsSuggestionsArray.length > 0 ? (
                  // List of suggestions
                  gMapsSuggestionsArray.map((suggestion, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <ListItemText
                        primary={
                          <Typography noWrap sx={{ fontWeight: "normal" }}>
                            {suggestion.mainText}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            noWrap
                            sx={{
                              fontSize: 12.5,
                              color: alpha("#919EAB", 0.8),
                            }}
                          >
                            {suggestion.secondaryText}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  ))
                ) : (
                  // No results found message
                  <ListItem>
                    <SearchOff sx={{ mr: 1 }} />
                    <ListItemText
                      primary={`No results found for ${watchedSelecteTextfieldLocation}.`}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          )}
      </Box>
    </Grid2>
  );
};

export default PropertyLocationAutoComplete;
