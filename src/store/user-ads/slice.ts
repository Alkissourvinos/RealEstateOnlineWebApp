import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { getAllAdsThunk, saveAdInDBThunk } from "./operations";
import { Ad } from "../../models/types";
import { RootState } from "../store";

// Define state interface
interface userAdsState {
  ads: EntityState<Ad, number> & {
    isLoading: boolean;
    currentAd: number | null;
    currentDisplayedAd: number | null;
    adBeingEdited: number | null;
    createIsLoading: boolean;
    creatingAdError: boolean;
  };
}

// Create entity adapter for ads
const adsAdapter = createEntityAdapter<Ad>();

// Initial state
const initialState: userAdsState = {
  ads: adsAdapter.getInitialState({
    isLoading: false,
    currentAd: null,
    currentDisplayedAd: null,
    adBeingEdited: null,
    createIsLoading: false,
    creatingAdError: false,
  }),
};

// Create slice
const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    onSetCreateLoading(state, { payload }) {
      state.ads.createIsLoading = payload;
    },
    onSetCurrentDisplayingAd(state, { payload }) {
      state.ads.currentDisplayedAd = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllAdsThunk states
      .addCase(getAllAdsThunk.pending, (state) => {
        state.ads.isLoading = true;
      })
      .addCase(getAllAdsThunk.fulfilled, (state, action) => {
        const { ads } = action.payload;
        adsAdapter.addMany(state.ads, ads);
        state.ads.isLoading = false;
      })
      .addCase(getAllAdsThunk.rejected, (state) => {
        state.ads.isLoading = false;
      })

      // Handle saveAdInDBThunk states
      .addCase(saveAdInDBThunk.fulfilled, (state, action) => {
        const { adId, createdAt, locationId } = action.payload;
        const payload = action.payload.payload;

        // Create new ad object
        const newAd: Ad = {
          id: adId,
          title: payload.title,
          adType: payload.adType,
          propertyCategory: payload.propertyCategory,
          propertyCondition: payload.propertyCondition,
          propertyFloor: payload.propertyFloor,
          propertysize: payload.propertysize,
          buildDate: payload.buildDate,
          renovationDate: payload.renovationDate,
          bedrooms: payload.bedrooms,
          masterBedrooms: payload.masterBedrooms,
          bathrooms: payload.bathrooms,
          WC: payload.WC,
          energyClass: payload.energyClass,
          price: payload.price,
          propertyZone: payload.propertyZone,
          extraInfo: payload.extraInfo,
          contactEmail: payload.contactInfo.email,
          contactPhone: payload.contactInfo.phone,
          contactHoursFrom: payload.contactInfo.contactHoursFrom,
          contactHoursTo: payload.contactInfo.contactHoursTo,
          created_at: createdAt,
          location: {
            id: locationId,
            placeID: payload.placeID,
            primaryAddress: payload.primaryAddress,
            secondaryAddress: payload.secondaryAddress,
          },
        };

        adsAdapter.addOne(state.ads, newAd);
        state.ads.createIsLoading = false;
        state.ads.creatingAdError = false;
      })
      .addCase(saveAdInDBThunk.rejected, (state) => {
        state.ads.createIsLoading = false;
        state.ads.creatingAdError = true;
      });
  },
});

// Selectors
export const selectCreateIsLoading = (state: RootState) =>
  state.ads.ads.createIsLoading;

export const selectCreateIsError = (state: RootState) =>
  state.ads.ads.creatingAdError;

export const selectDisplayedAd = (state: RootState) =>
  state.ads.ads.currentDisplayedAd;

export const { selectAll: selectAllAds, selectById: selectAdByID } =
  adsAdapter.getSelectors((state: RootState) => state.ads.ads);

// Export actions and reducer
export const { onSetCreateLoading, onSetCurrentDisplayingAd } =
  adsSlice.actions;

export default adsSlice.reducer;
