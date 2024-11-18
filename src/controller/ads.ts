import { createAndSaveAd } from "../models/types/payloads";
import { api } from "./axios/baseConfig";
import { GetAdsResponse } from "../models/types";

// Fetch all ads from backend
export const getAllAds = async (): Promise<GetAdsResponse> => {
  try {
    const response = await api.get("/ads/getAllAds");
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

// Save new ad to database and return response with original payload
export async function saveAdInDB(payload: createAndSaveAd) {
  try {
    const response = await api.post("/ads/saveAdInDB", { payload });

    if (response.data.success) {
      return {
        ...response.data,
        payload, // Include original payload in response
      };
    }
    throw new Error();
  } catch (error) {
    throw error;
  }
}
