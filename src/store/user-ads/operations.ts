import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAds, saveAdInDB } from "../../controller/ads";
import {
  createAndSaveAd,
  getAdsByUserIDPayload,
} from "../../models/types/payloads";

// Thunk action
export const getAllAdsForUserIDThunk = createAsyncThunk(
  "ads/GetAllAdsForUserID",
  async (payload: getAdsByUserIDPayload) => {
    try {
      const response = {};
      return response;
    } catch (e) {
      console.log("errror in op", e);
    }
  }
);

export const getAllAdsThunk = createAsyncThunk(
  "ads/getAllAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAds();
      return response;
    } catch (e) {
      console.error("Error fetching ads:", e);
      return rejectWithValue({
        message: "Failed to fetch ads",
        error: e,
      });
    }
  }
);

export const saveAdInDBThunk = createAsyncThunk(
  "ads/saveAdInDB",
  async (payload: createAndSaveAd, { rejectWithValue }) => {
    try {
      const response = await saveAdInDB(payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
