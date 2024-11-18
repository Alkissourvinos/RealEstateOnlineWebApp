import { Container, Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider from "../components/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createAnAdForm } from "../../models/types";
import CreateAdMain from "../components/CreateAdMain";
const CreateAdPage = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .max(155, "Title cannot exceed 155 characters"),
    locationTextfieldName: Yup.string().required(
      "The location of the property is required"
    ),
    placeID: Yup.string().required("The location of the property is required"),
    adType: Yup.string().required("Ad type is required"),
    propertyCategory: Yup.string().required("Property category is required"),
    propertyCondition: Yup.string().required("Property condition is required"),
    propertyFloor: Yup.mixed().test(
      "propertyFloorRequired",
      "Property floor is required",
      function (this: Yup.TestContext, value: unknown) {
        return !!value;
      }
    ),
    propertysize: Yup.mixed().test(
      "propertysizeRequired",
      "Property size is required",
      function (this: Yup.TestContext, value: unknown) {
        return !!value;
      }
    ),
    buildDate: Yup.mixed().test(
      "buildDateRequired",
      "Build date is required",
      function (this: Yup.TestContext, value: unknown) {
        return !!value;
      }
    ),
    renovationDate: Yup.mixed().test(
      "renovationDateRequired",
      "Renovation date is required",
      function (this: Yup.TestContext, value: unknown) {
        return !!value;
      }
    ),
    bedrooms: Yup.mixed().test(
      "bedroomsRequired",
      "Number of bedrooms is required",
      function (this: Yup.TestContext, value: unknown) {
        return value !== undefined && value !== null && value !== "";
      }
    ),
    masterBedrooms: Yup.mixed().test(
      "masterBedroomsRequired",
      "Number of master bedrooms is required",
      function (this: Yup.TestContext, value: unknown) {
        return value !== undefined && value !== null && value !== "";
      }
    ),
    bathrooms: Yup.mixed().test(
      "bathroomsRequired",
      "Number of bathrooms is required",
      function (this: Yup.TestContext, value: unknown) {
        return value !== undefined && value !== null && value !== "";
      }
    ),
    WC: Yup.mixed().test(
      "WCRequired",
      "Number of WCs is required",
      function (this: Yup.TestContext, value: unknown) {
        return value !== undefined && value !== null && value !== "";
      }
    ),
    energyClass: Yup.string().required("Energy class is required"),
    price: Yup.mixed().test(
      "priceRequired",
      "Price is required",
      function (this: Yup.TestContext, value: unknown) {
        return !!value;
      }
    ),
    propertyZone: Yup.string().required("Property zone is required"),
    extraInfo: Yup.string(),
    contactInfo: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.mixed().test(
        "phoneRequired",
        "Phone is required",
        function (this: Yup.TestContext, value: unknown) {
          if (!value) return false;

          // Convert to string to handle both number and string inputs
          const phoneStr = value.toString();
          if (phoneStr.length > 17) {
            return this.createError({
              message: "Phone number must be exactly 17 digits",
            });
          }

          return true;
        }
      ),
      contactHoursFrom: Yup.string().required("Contact hours from is required"),
      contactHoursTo: Yup.string().when("contactHoursFrom", {
        is: (val: string) => val && val.length > 0,
        then: (schema) => schema.required("Contact hours to is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  }) as Yup.ObjectSchema<createAnAdForm>;

  const methods = useForm<createAnAdForm>({
    resolver: yupResolver<createAnAdForm>(validationSchema),
    defaultValues: {
      title: "",
      locationTextfieldName: "",
      primaryAddress: "",
      secondaryAddress: "",
      placeID: "",
      predictions: null,
      adType: "",
      propertyCategory: "",
      propertyCondition: "",
      propertyFloor: [],
      propertysize: "",
      buildDate: "",
      renovationDate: "",
      bedrooms: "",
      masterBedrooms: "",
      bathrooms: "",
      WC: "",
      energyClass: "",
      price: "",
      propertyZone: "",
      extraInfo: "",
      contactInfo: {
        email: "",
        phone: "",
        contactHoursFrom: "",
        contactHoursTo: "",
      },
    },
  });

  return (
    <Container sx={{ minWidth: "90%" }}>
      <Grid2 container sx={{ my: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Creating an Ad
        </Typography>
      </Grid2>
      <FormProvider methods={methods}>
        <CreateAdMain />
      </FormProvider>
    </Container>
  );
};

export default CreateAdPage;
