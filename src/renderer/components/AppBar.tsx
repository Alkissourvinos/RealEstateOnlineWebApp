import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

// Simple navigation bar with home icon button that redirects to root route
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/")}
          >
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
