import { api } from "./axios/baseConfig";

// Fetch location suggestions based on user input
export async function getLocationSuggestions(input: string) {
  try {
    const response = await api.post("location/getLocationSuggestions", {
      input,
    });
    return response.data; // Returns array of suggested locations
  } catch (error) {
    throw error;
  }
}
