import { Button, Card, Divider, Grid2, Typography } from "@mui/material";
import { PaperBackGroundColor } from "../../models/Theme/customPallete";
import {
  adTypeMapper,
  createAnAdForm,
  energyClassMapper,
  hoursMapper,
  propertyTypesMapper,
  stateOfPropertyMapper,
  zoneMapper,
} from "../../models/types";
import MultiFloorSelect from "./MultiFloorSelect";
import {
  AlternateEmail,
  ApartmentOutlined,
  Bed,
  Category,
  ConstructionOutlined,
  CreditCard,
  Description,
  EnergySavingsLeaf,
  Engineering,
  Map,
  ShareLocation,
  Shower,
  SquareFoot,
  Stairs,
  Title,
  WatchLater,
} from "@mui/icons-material";
import DynamicSelect from "./GeneralFormComponents/DynamicSelect";
import HeaderWithIcon from "./GeneralFormComponents/HeaderWithIcon";
import DynamicTextInput from "./GeneralFormComponents/DynamicTextInput";
import PropertyLocationAutoComplete from "./GeneralFormComponents/PropertyLocationAutoComplete";
import {
  FieldValues,
  SubmitHandler,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { createAndSaveAd } from "../../models/types/payloads";
import { useState } from "react";
import ConfirmModal from "./GeneralFormComponents/ConrifmModal";
import { useAppDispatch } from "../../store/store";
import { saveAdInDBThunk } from "../../store/user-ads/operations";
import { onSetCreateLoading } from "../../store/user-ads/slice";

const CreateAdMain = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<createAndSaveAd | null>(null);

  const watchedFromHour = useWatch({
    name: "contactInfo.contactHoursFrom",
  });

  const watchedToHour = useWatch({
    name: "contactInfo.contactHoursTo",
  });

  const getFilteredHours = (isFrom: boolean) => {
    const hours = Object.values(hoursMapper);

    if (isFrom) {
      return watchedToHour
        ? hours.filter((hour) => hour < watchedToHour)
        : hours;
    } else {
      return watchedFromHour
        ? hours.filter((hour) => hour > watchedFromHour)
        : hours;
    }
  };

  const handleCreateAd: SubmitHandler<createAnAdForm> = (data) => {
    const payload: createAndSaveAd = {
      title: data.title,
      primaryAddress: data.primaryAddress,
      secondaryAddress: data.secondaryAddress,
      placeID: data.placeID,
      adType: data.adType,
      propertyCategory: data.propertyCategory,
      propertyCondition: data.propertyCondition,
      propertyFloor: (data.propertyFloor as string[]).join(","),
      propertysize: data.propertysize as number,
      buildDate: data.buildDate as number,
      renovationDate: data.renovationDate as number,
      bedrooms: data.bedrooms as number,
      masterBedrooms: data.masterBedrooms as number,
      bathrooms: data.bathrooms as number,
      WC: data.WC as number,
      energyClass: data.energyClass,
      price: data.price as number,
      propertyZone: data.propertyZone,
      extraInfo: data.extraInfo,
      contactInfo: {
        email: data.contactInfo.email,
        phone: data.contactInfo.phone as number,
        contactHoursFrom: data.contactInfo.contactHoursFrom,
        contactHoursTo: data.contactInfo.contactHoursTo,
      },
    };
    setFormData(payload);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      try {
        dispatch(onSetCreateLoading(true));

        const response = await dispatch(saveAdInDBThunk(formData));
        if (response?.payload?.success === true) {
          setIsModalOpen(false);
          navigate("/");
        }
      } catch (error: any) {
        // Handle error
        throw new Error(error);
      }
    }
  };
  return (
    <Card
      elevation={4}
      sx={{
        minHeight: "80vh",
        mt: "1rem",
        mb: "2rem",
        backgroundColor: PaperBackGroundColor.paper,
        p: "0.5rem",
      }}
    >
      <Grid2 container sx={{ mb: "0.5rem" }}>
        <span
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginRight: "0.2rem",
          }}
        >
          {<Title sx={{ color: "primary.main" }} />}
        </span>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Title
        </Typography>
      </Grid2>
      <Grid2 container sx={{ my: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicTextInput
            name="title"
            textfieldLabel="Write a title for this add"
            customSize={{ xs: 12, md: 12 }}
            multiLine
            maxRows={2}
            type="text"
          />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ mb: "0.5rem" }}>
        <span
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginRight: "0.2rem",
          }}
        >
          {<Map sx={{ color: "primary.main" }} />}
        </span>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Property Location
        </Typography>
      </Grid2>
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <PropertyLocationAutoComplete />
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container sx={{ my: "0.5rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          General Property Info
        </Typography>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container>
        <Grid2 size={{ xs: 7 }}>
          <DynamicSelect
            headerLabel="What type of ad should be created?"
            headerIcon={<Category sx={{ color: "primary.main" }} />}
            name="adType"
            textfieldLabel="Ad types"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={Object.values(adTypeMapper)}
          />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicSelect
            headerLabel="Property Category"
            headerIcon={<ApartmentOutlined sx={{ color: "primary.main" }} />}
            name="propertyCategory"
            textfieldLabel="Category"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={Object.values(propertyTypesMapper)}
          />
          <DynamicSelect
            headerLabel="The condition of the property"
            headerIcon={<ConstructionOutlined sx={{ color: "primary.main" }} />}
            name="propertyCondition"
            textfieldLabel="Condition"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={Object.values(stateOfPropertyMapper)}
          />
        </Grid2>
      </Grid2>
      <Divider />
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ my: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
          }}
        >
          <Grid2 size={{ xs: 12, md: 12 }}>
            <HeaderWithIcon
              headerLabel="Floors"
              headerIcon={<Stairs sx={{ color: "primary.main" }} />}
            />
            <MultiFloorSelect />
          </Grid2>
        </Grid2>
      </Grid2>
      <Divider />
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ my: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicTextInput
            headerLabel="Price(€)"
            headerIcon={<CreditCard sx={{ color: "primary.main" }} />}
            name="price"
            textfieldLabel="Price in euros"
            placeholderText="i.e 500"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
          <DynamicSelect
            headerLabel="Zoning of the property"
            headerIcon={<ShareLocation sx={{ color: "primary.main" }} />}
            name="propertyZone"
            textfieldLabel="Zone"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={Object.values(zoneMapper)}
          />
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container sx={{ my: "0.5rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Additional Property features
        </Typography>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2 size={{ xs: 7 }}>
          <DynamicTextInput
            headerLabel="Area"
            headerIcon={<SquareFoot sx={{ color: "primary.main" }} />}
            name="propertysize"
            textfieldLabel="Area in square meters"
            placeholderText="i.e 500"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
        </Grid2>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicTextInput
            headerLabel="Date of construction"
            headerIcon={<Engineering sx={{ color: "primary.main" }} />}
            name="buildDate"
            textfieldLabel="Constructed in:"
            placeholderText="i.e 1980"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
          <DynamicTextInput
            headerLabel="Renovation"
            name="renovationDate"
            textfieldLabel="Renovated in:"
            placeholderText="i.e 2000"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
        </Grid2>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicTextInput
            headerLabel="Number of bedrooms"
            headerIcon={<Bed sx={{ color: "primary.main" }} />}
            name="bedrooms"
            textfieldLabel="Bedrooms"
            placeholderText="i.e 2"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
          <DynamicTextInput
            headerLabel="Master bedrooms"
            name="masterBedrooms"
            textfieldLabel="Master Bedrooms"
            placeholderText="i.e 1"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
        </Grid2>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicTextInput
            headerLabel="Number of bathrooms"
            headerIcon={<Shower sx={{ color: "primary.main" }} />}
            name="bathrooms"
            textfieldLabel="Bathrooms"
            placeholderText="i.e 1"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
          <DynamicTextInput
            headerLabel="WC"
            name="WC"
            textfieldLabel="WC"
            placeholderText="i.e 2"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
        </Grid2>
      </Grid2>
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicSelect
            headerLabel="Energy Class"
            headerIcon={<EnergySavingsLeaf sx={{ color: "primary.main" }} />}
            name="energyClass"
            textfieldLabel="Energy Class"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={Object.values(energyClassMapper)}
          />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2 size={{ xs: 7 }}>
          <DynamicTextInput
            headerLabel="Description for this property"
            headerIcon={<Description sx={{ color: "primary.main" }} />}
            name="extraInfo"
            textfieldLabel="Description(Optional)"
            multiLine={true}
            rows={3}
            customSize={{ xs: 12, md: 12 }}
            type="text"
          />
        </Grid2>
      </Grid2>
      <Divider />
      {/* ----------------/////////////////// ------------------------------- */}
      <Grid2 container sx={{ my: "0.5rem" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Contact Information
        </Typography>
      </Grid2>
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2 size={{ xs: 7 }}>
          <DynamicTextInput
            headerLabel="Contact Email"
            headerIcon={<AlternateEmail sx={{ color: "primary.main" }} />}
            name="contactInfo.email"
            placeholderText=" i.e mail@contact.com"
            customSize={{ xs: 12, md: 5.5 }}
            type="text"
          />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2 size={{ xs: 7 }}>
          <DynamicTextInput
            headerLabel="Contact phone number"
            headerIcon={<Description sx={{ color: "primary.main" }} />}
            name="contactInfo.phone"
            placeholderText=" i.e 69XXXXXXX"
            customSize={{ xs: 12, md: 5.5 }}
            type="number"
          />
        </Grid2>
      </Grid2>
      <HeaderWithIcon
        headerLabel="Contact Hours"
        headerIcon={<WatchLater sx={{ color: "primary.main" }} />}
      />
      <Grid2 container sx={{ mb: "1rem" }}>
        <Grid2
          size={{ xs: 7 }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DynamicSelect
            name="contactInfo.contactHoursFrom"
            textfieldLabel="From"
            customSize={{ xs: 12, md: 5.5 }}
            optionsArray={getFilteredHours(true)}
          />
          <DynamicSelect
            name="contactInfo.contactHoursTo"
            textfieldLabel="To"
            customSize={{ xs: 12, md: 5.5 }}
            disabled={isEmpty(watchedFromHour)}
            optionsArray={getFilteredHours(false)}
          />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ justifyContent: "space-between", mb: "0.3rem" }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit((data: FieldValues) =>
            handleCreateAd(data as createAnAdForm)
          )}
          sx={{ textTransform: "none" }}
        >
          Create and Save Ad
        </Button>
      </Grid2>
      <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </Card>
  );
};

export default CreateAdMain;
