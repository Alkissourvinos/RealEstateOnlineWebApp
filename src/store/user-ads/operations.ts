import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAds, saveAdInDB } from "../../controller/ads";
import { createAndSaveAd } from "../../models/types/payloads";

// Thunk to fetch all ads
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

// Thunk to save a new ad
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
