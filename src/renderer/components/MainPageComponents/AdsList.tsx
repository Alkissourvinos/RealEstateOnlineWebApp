// Import necessary Material-UI components and icons
import {
  List,
  ListItemText,
  Typography,
  Box,
  ListSubheader,
  IconButton,
  Button,
  Paper,
  Divider,
  Tooltip,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // For time-ago formatting
import { useSelector } from "react-redux";
import {
  onSetCurrentDisplayingAd,
  selectAdByID,
  selectAllAds,
  selectDisplayedAd,
} from "../../../store/user-ads/slice";
import { RootState, useAppDispatch } from "../../../store/store";

/**
 * Component representing a single advertisement item in the list
 * @param adId - The ID of the advertisement to display
 */
const AdListItem = ({ adId }: { adId: number }) => {
  // Get ad details from Redux store
  const ad = useSelector((state: RootState) => selectAdByID(state, adId));
  const dispatch = useAppDispatch();
  const currentlyDisplayedAdID = useSelector(selectDisplayedAd);

  // Handle click event to display selected ad
  const handleClick = () => {
    dispatch(onSetCurrentDisplayingAd(adId));
  };

  // Don't render if ad doesn't exist
  if (!ad) return null;

  return (
    <ListItemButton
      divider
      onClick={handleClick}
      selected={ad.id === currentlyDisplayedAdID}
    >
      <ListItemText
        primary={
          // Ad title with custom styling
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {ad.title}
          </Typography>
        }
        secondary={
          <>
            {/* Address information */}
            <Typography component="span" variant="body2" color="text.primary">
              {`${ad.location.primaryAddress}, ${ad.location.secondaryAddress}`}
            </Typography>
            {/* Creation time in "time ago" format */}
            <Typography
              component="span"
              variant="body2"
              color="text.disabled"
              sx={{ display: "block" }}
            >
              Created:
              {formatDistanceToNow(ad.created_at * 1000, {
                addSuffix: true,
                includeSeconds: true,
              }).replace("about ", "")}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
};

/**
 * Main component for displaying the list of advertisements
 * Includes responsive design for mobile and desktop views
 */
const AdsList = () => {
  const navigate = useNavigate();
  const ads = useSelector(selectAllAds);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const currentlyDisplayedAdID = useSelector(selectDisplayedAd);
  const selectedAd = useSelector((state: RootState) =>
    currentlyDisplayedAdID ? selectAdByID(state, currentlyDisplayedAdID) : null
  );

  // Header component with title and add button
  const header = (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Your Advertisements
        </Typography>
        {/* Show add button only if there are existing ads */}
        {ads.length !== 0 && (
          <Tooltip title="Create more ads" arrow placement="top">
            <IconButton
              color="primary"
              onClick={() => navigate("/create-ad")}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {/* Mobile-specific selected ad indicator */}
      {isMobile && selectedAd && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Viewing ad with Title:
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {selectedAd.title}
          </Typography>
        </Box>
      )}
    </Stack>
  );

  // Main content component with list of ads or create button
  const content = (
    <>
      {ads.length === 0 ? (
        // Show create button if no ads exist
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/create-ad")}
            sx={{ textTransform: "none" }}
          >
            Create your first ad
          </Button>
        </Box>
      ) : (
        // Display list of existing ads
        ads.map((ad) => <AdListItem key={ad.id} adId={ad.id} />)
      )}
    </>
  );

  // Mobile layout using Accordion
  if (isMobile) {
    return (
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          m: "0.5rem",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              flexDirection: "column",
              "& .MuiAccordionSummary-content": {
                width: "100%",
              },
            }}
          >
            {header}
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List
              disablePadding
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: "60vh",
                "& ul": { padding: 0 },
              }}
            >
              {content}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    );
  }

  // Desktop layout using List
  return (
    <Paper
      elevation={4}
      sx={{
        width: {
          sm: "40%",
          md: "30%",
          lg: "25%",
        },
        bgcolor: "background.paper",
        m: "0.5rem",
      }}
    >
      <List
        disablePadding
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "80vh",
          "& ul": { padding: 0 },
        }}
      >
        <ListSubheader
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "background.paper",
            top: 0,
            zIndex: 1,
            p: "0.4rem",
            width: "100%",
          }}
        >
          {header}
        </ListSubheader>
        <Divider variant="middle" />
        {content}
      </List>
    </Paper>
  );
};

export default AdsList;
