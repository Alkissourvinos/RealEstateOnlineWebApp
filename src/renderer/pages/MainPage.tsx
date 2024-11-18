import { Card, Container } from "@mui/material";
import { PaperBackGroundColor } from "../../models/Theme/customPallete";
import { getAllAdsThunk } from "../../store/user-ads/operations";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllAds } from "../../store/user-ads/slice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllAdsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ads = useSelector(selectAllAds);
  console.log(ads);
  return (
    <Container disableGutters maxWidth="xl">
      <Card
        elevation={4}
        sx={{
          minHeight: "80vh",
          mt: "1rem",
          backgroundColor: PaperBackGroundColor.paper,
        }}
      >
        here
      </Card>
    </Container>
  );
};

export default MainPage;
