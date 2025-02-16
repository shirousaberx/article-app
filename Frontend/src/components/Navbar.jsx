import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box, Container } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976D2", boxShadow: 3 }}>
        <Container>
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Side - Title/Logo */}
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                color: "white", 
                textDecoration: "none", 
                fontWeight: "bold", 
                mr: 2 
              }}
            >
              Article Manager
            </Typography>

            {/* Right Side - Navigation Buttons */}
            <Box>
              <Button 
                color="inherit" 
                component={Link} 
                to="/" 
                sx={{ mx: 1, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
              >
                All Posts
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/add" 
                sx={{ mx: 1, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
              >
                Add New
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/preview" 
                sx={{ mx: 1, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
              >
                Preview
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Margin below the navbar */}
      <Box sx={{ mt: 3 }} />
    </>
  );
};

export default Navbar;
