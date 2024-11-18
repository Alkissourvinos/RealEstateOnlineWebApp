// UI and state management imports
import { Card, Container, Grid2, Typography } from "@mui/material";
import { PaperBackGroundColor } from "../../models/Theme/customPallete";
import { getAllAdsThunk } from "../../store/user-ads/operations";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import AdsList from "../components/MainPageComponents/AdsList";
import AdPreview from "../components/MainPageComponents/AdPreview";

const MainPage = () => {
  const dispatch = useAppDispatch();

  // Fetch ads on component mount
  useEffect(() => {
    dispatch(getAllAdsThunk());
  }, [dispatch]);

  return (
    <Container sx={{ minWidth: "90%" }}>
      <Grid2 container sx={{ my: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Home Page
        </Typography>
      </Grid2>
      <Card
        elevation={4}
        sx={{
          minHeight: "80vh",
          mt: "1rem",
          backgroundColor: PaperBackGroundColor.paper,
          display: "flex",
          flexDirection: {
            xs: "column", // Stack on mobile
            md: "row", // Side by side on desktop
          },
        }}
      >
        <AdsList />
        <AdPreview />
      </Card>
    </Container>
  );
};

export default MainPage;
