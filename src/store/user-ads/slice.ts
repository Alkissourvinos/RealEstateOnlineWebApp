import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { getAllAdsThunk, saveAdInDBThunk } from "./operations";
import { Ad } from "../../models/types";
import { RootState } from "../store";

interface userAdsState {
  ads: EntityState<Ad, number> & {
    isLoading: boolean;
    currentAd: number | null;
    adBeingEdited: number | null;
    createIsLoading: boolean;
    creatingAdError: boolean;
  };
}

const adsAdapter = createEntityAdapter<Ad>();

const initialState: userAdsState = {
  ads: adsAdapter.getInitialState({
    isLoading: false,
    currentAd: null,
    adBeingEdited: null,
    createIsLoading: false,
    creatingAdError: false,
  }),
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    onSetCreateLoading(state, { payload }) {
      state.ads.createIsLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getAllAdsForUserIDThunk.pending, (state) => {
      //   state.ads.isLoading = true;
      // })
      // .addCase(getAllAdsForUserIDThunk.fulfilled, (state, action) => {
      //   state.ads.isLoading = false;
      //   // adsAdapter.setAll(state.ads, action.payload.ads);
      // })
      // .addCase(getAllAdsForUserIDThunk.rejected, (state) => {
      //   state.ads.isLoading = false;
      // })
      .addCase(getAllAdsThunk.pending, (state) => {
        state.ads.isLoading = true;
      })
      .addCase(getAllAdsThunk.fulfilled, (state, action) => {
        // console.log("In slice", );
        const { ads } = action.payload;
        adsAdapter.addMany(state.ads, ads);
        state.ads.isLoading = false;
      })
      .addCase(getAllAdsThunk.rejected, (state, action) => {
        state.ads.isLoading = false;
      })

      .addCase(saveAdInDBThunk.fulfilled, (state, action) => {
        const { adId, createdAt, locationId } = action.payload;
        const payload = action.payload.payload;

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
      .addCase(saveAdInDBThunk.rejected, (state, action) => {
        state.ads.createIsLoading = false;
        state.ads.creatingAdError = true;
      });
  },
});

export const selectCreateIsLoading = (state: RootState) =>
  state.ads.ads.createIsLoading;

export const selectCreateIsError = (state: RootState) =>
  state.ads.ads.creatingAdError;

export const { selectAll: selectAllAds, selectById: selectAdByID } =
  adsAdapter.getSelectors((state: RootState) => state.ads.ads);

export const { onSetCreateLoading } = adsSlice.actions;

export default adsSlice.reducer;
