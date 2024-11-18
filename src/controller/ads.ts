import { createAndSaveAd } from "../models/types/payloads";
import { api } from "./axios/baseConfig";
import { GetAdsResponse } from "../models/types";

export const getAllAds = async (): Promise<GetAdsResponse> => {
  try {
    const response = await api.get("/ads/getAllAds");
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export async function saveAdInDB(payload: createAndSaveAd) {
  try {
    const response = await api.post("/ads/saveAdInDB", {
      payload,
    });
    if (response.data.success === true) {
      return {
        ...response.data,
        payload,
      };
    } else {
      throw new Error();
    }
  } catch (error) {
    throw error;
  }
}
