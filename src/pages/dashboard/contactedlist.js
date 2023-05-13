import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NavDashboard from "@/components/NavDashboard";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
export default function Booking() {
  const [contacts, setContacts] = useState([])
  const [index, setIndex] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [address, setAddress] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };


  const getData = () => {
    axios.get("/api/contact")
    .then(res => setContacts(res.data))
    .catch(error=>console.log(error));
  }

  useEffect(() => {
    getData();
  }, [contacts]);
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
            <NavDashboard />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }} textAlign={"center"}>
                <Typography variant={"h3"}>Contacted List</Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: "0 50px"}} justifyContent={"center"}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>By</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Message</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts.map((row) => (
                        <TableRow
                          key={row.nickname}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.nickname}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
