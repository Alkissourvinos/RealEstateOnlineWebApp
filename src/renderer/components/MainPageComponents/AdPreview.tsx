import {
  Box,
  Paper,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Grid2,
} from "@mui/material";

import {
  Category,
  Stairs,
  SquareFoot,
  Map,
  ShareLocation,
  ApartmentOutlined,
  ConstructionOutlined,
  Engineering,
  Bed,
  Shower,
  Wc,
  EnergySavingsLeaf,
  CreditCard,
  Description,
  AlternateEmail,
  WatchLater,
  Brush,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectAdByID, selectDisplayedAd } from "../../../store/user-ads/slice";
import { RootState } from "../../../store/store";
import { Ad } from "../../../models/types";

const createDataRows = (ad: Ad) => [
  {
    section: "Location Details",
    items: [
      {
        icon: <Map color="primary" />,
        label: "Address",
        value: [ad?.location?.primaryAddress, ad?.location?.secondaryAddress]
          .filter(Boolean)
          .join(", "),
      },
      {
        icon: <ShareLocation color="primary" />,
        label: "Place ID",
        value: ad?.location?.placeID,
      },
    ],
  },
  {
    section: "Property Details",
    items: [
      {
        icon: <Category color="primary" />,
        label: "Ad Type",
        value: ad?.adType,
      },
      {
        icon: <ApartmentOutlined color="primary" />,
        label: "Category",
        value: ad?.propertyCategory,
      },
      {
        icon: <ConstructionOutlined color="primary" />,
        label: "Condition",
        value: ad?.propertyCondition,
      },
      {
        icon: <Stairs color="primary" />,
        label: "Floor",
        value: ad?.propertyFloor,
      },
      {
        icon: <SquareFoot color="primary" />,
        label: "Size",
        value: ad?.propertysize ? `${ad.propertysize} m²` : null,
      },
      {
        icon: <Engineering color="primary" />,
        label: "Build Date",
        value: ad?.buildDate,
      },
      {
        icon: <Engineering color="primary" />,
        label: "Renovation Date",
        value: ad?.renovationDate,
      },
    ],
  },
  {
    section: "Room Information",
    items: [
      {
        icon: <Bed color="primary" />,
        label: "Bedrooms",
        value: ad?.bedrooms,
      },
      {
        icon: <Bed color="primary" />,
        label: "Master Bedrooms",
        value: ad?.masterBedrooms,
      },
      {
        icon: <Shower color="primary" />,
        label: "Bathrooms",
        value: ad?.bathrooms,
      },
      { icon: <Wc color="primary" />, label: "WC", value: ad?.WC },
    ],
  },
  {
    section: "Additional Information",
    items: [
      {
        icon: <EnergySavingsLeaf color="primary" />,
        label: "Energy Class",
        value: ad?.energyClass,
      },
      {
        icon: <CreditCard color="primary" />,
        label: "Price",
        value: ad?.price ? `${ad.price} €` : null,
      },
      {
        icon: <ShareLocation color="primary" />,
        label: "Zone",
        value: ad?.propertyZone,
      },
      {
        icon: <Description color="primary" />,
        label: "Extra Info",
        value: ad?.extraInfo,
      },
    ],
  },
  {
    section: "Contact Information",
    items: [
      {
        icon: <AlternateEmail color="primary" />,
        label: "Email",
        value: ad?.contactEmail,
      },
      {
        icon: <Description color="primary" />,
        label: "Phone",
        value: ad?.contactPhone,
      },
      {
        icon: <WatchLater color="primary" />,
        label: "Contact Hours",
        value:
          ad?.contactHoursFrom && ad?.contactHoursTo
            ? `${ad.contactHoursFrom} - ${ad.contactHoursTo}`
            : null,
      },
    ],
  },
];

const DataRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | null;
}) => {
  if (value === null || value === undefined) return null;

  return (
    <Grid2 container spacing={2} sx={{ mb: 2 }}>
      <Grid2
        size={{ xs: 5, sm: 5 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon}
          <Typography color="text.secondary" fontWeight="medium">
            {label}:
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 5, sm: 1 }}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Divider orientation="vertical" />
      </Grid2>
      <Grid2 size={{ xs: 5, sm: 6 }}>
        <Typography noWrap={label === "Place ID" ? true : false}>
          {value}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

const AdPreview = () => {
  const currentlyDisplayedAdID = useSelector(selectDisplayedAd);
  const selectedAd = useSelector((state: RootState) =>
    selectAdByID(state, currentlyDisplayedAdID as number)
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!selectedAd) {
    return (
      <Paper
        sx={{
          flex: 1,
          m: 1,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Brush color="primary" sx={{ width: "4rem", height: "4rem" }} />
          <Typography color="text.secondary">
            Select an ad to view details
          </Typography>
        </Grid2>
      </Paper>
    );
  }

  const dataRows = createDataRows(selectedAd);

  return (
    <Paper
      sx={{
        flex: 1,
        m: 1,
        p: 1,
        overflowY: "auto",
        height: "calc(80vh )",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bolder", color: "text.primary" }}
      >
        {selectedAd.title}
      </Typography>

      <Divider sx={{ mb: "1rem", mt: "0.5rem" }} />

      <Box sx={{ px: isMobile ? 0 : 2 }}>
        {dataRows.map((section, index) => (
          <Box key={index}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              {section.section}
            </Typography>
            {section.items.map((item, itemIndex) => (
              <DataRow
                key={itemIndex}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
            {index < dataRows.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AdPreview;