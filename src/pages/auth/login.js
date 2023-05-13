import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
export default function Login() {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };


  const handleLogin = () => {
    localStorage.setItem("auth", {
      username,
      password
    })
    window.location = "/dashboard/freetimes";
  }

  useEffect(() => {
    if(localStorage.getItem("auth")){
      window.location = "/dashboard/freetimes";
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your appointment is successfully booked. I will be there ;)
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Container>
        <Box sx={{ height: "100vh" }}>
          <Paper
            elevation={2}
            sx={{position: "relative", overflowX: "hidden", minHeight: "100vh" }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }} textAlign={"center"}>
                <Typography variant={"h3"}>Login</Typography>
              </Grid>
              <Grid item xs={12} sx={{width: "500px", display:"flex", justifyContent: "center"}}>
                <TextField
                    value={username}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    />
              </Grid>
              <Grid item xs={12} sx={{width: "500px", display:"flex", justifyContent: "center"}}>
                <TextField
                    value={password}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    />
              </Grid>
              <Grid item xs={12}  sx={{width: "500px", display:"flex", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              sx={{ margin: "50px 0 0 0" }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: "5vh",
                  width: "100vw",
                  backgroundColor: "darkblue",
                  color: "wheat",
                  position: "absolute",
                  bottom: 0,
                }}
                textAlign={"center"}
              >
                <Typography variant="body1">With Love By Milad</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
