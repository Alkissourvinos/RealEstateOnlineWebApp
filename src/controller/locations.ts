import { api } from "./axios/baseConfig";

export async function getLocationSuggestions(input: string) {
  try {
    const response = await api.post("location/getLocationSuggestions", {
      input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
