import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BookTime from "@/components/BookTime";
import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import AlarmOn from "@mui/icons-material/AlarmOn";
import LocalPhone from "@mui/icons-material/LocalPhone";
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import axios from "axios";
export default function Booking() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [contactName, setContactName] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [contactMessage, setContactMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([
    {
      src: "/1.jpg"
    },
    {
      src: "/2.jpg"
    },
  ]);
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      nickname: "Milad Hazrati",
      body: "But web browsers aren’t like web servers. If your back-end code is getting so big that it’s starting to run noticably slowly, you can throw more computing",
    },
  ]);
  const [availableTimes, setAvailableTimes] = useState([
    {
      id: 1,
      maxClient: 3,
      from: new Date(2023, 4, 6, 8, 0, 0),
      until: new Date(2023, 4, 6, 10, 0, 0),
    },
    {
      id: 2,
      maxClient: 3,
      from: new Date(2023, 4, 8, 8, 0, 0),
      until: new Date(2023, 4, 8, 10, 0, 0),
    },
  ]);
  const handleContact = () => {
    axios.post("/api/contact", {
      nickname: contactName,
      email: contactEmail,
      message: contactMessage
    }).then(res => {
      setMessage({message: res?.data.message, severity: "success"})
      setOpenSnackBar(true);
    }).catch(err=> {
      setMessage({message: err?.response?.data?.message, severity: "error"})
      setOpenSnackBar(true);
    });
  }

  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

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
          severity={message?.severity}
          sx={{ width: "100%" }}
        >
          {message?.message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Container>
        <Box sx={{ height: "100vh" }}>
          <Paper
            elevation={2}
            sx={{ padding: "10px 0 0 0", overflowX: "hidden" }}
          >
            <Grid
              container
              rowSpacing={1}
              sx={{ padding: "0 20px" }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Welcome to Milad Plumbing's
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign={"right"}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Let's Book a Time!
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ height: "40vh" }}>
                <Carousel sx={{ height: "100%" }}>
                  {images.map((item, index) => <img key={index} src={item.src}/>)}
                </Carousel>
              </Grid>
              <Grid item xs={12} sx={{ height: "auto", padding: "10px 5px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "4em",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <Typography variant="h6">On Time</Typography>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "4em",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <Typography variant="h6">Accurate</Typography>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "4em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <Typography variant="h6">Professional</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography textAlign={"center"} variant="h6" fontWeight={"bolder"} my={"40px"}>
              Book Your Time In One Minute!
            </Typography>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <BookTime
                  onSuccess={(booked) => {
                    setMessage(booked)
                    setOpenSnackBar(true);
                  }}
                  onError={(booked) => {
                    setMessage(booked);
                    setOpenSnackBar(true)
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ height: "auto", padding: "10px 30px" }}
              >
                <Typography
                  textAlign={"center"}
                  variant="h6"
                  fontWeight={"bolder"}
                  mb={"30px"}
                >
                  What I can do:
                </Typography>

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  justifyContent={"center"}
                >
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "3em",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <Typography variant="body1">On Time</Typography>
                    </Paper>
                    <Typography variant={"subtitle"}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "3em",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <Typography variant="body1">Accurate</Typography>
                    </Paper>
                    <Typography variant={"subtitle"}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "fit-content",
                        padding: "20px",
                      }}
                    >
                      <AlarmOn
                        sx={{
                          fontSize: "3em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <Typography variant="body1">Professional</Typography>
                    </Paper>
                    <Typography variant={"subtitle"}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography
              variant={"h6"}
              textAlign={"center"}
              fontWeight={"bolder"}
              my={"30px"}
            >
              Customers' Saying
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ height: "auto" }}>
                <Carousel sx={{ height: "100%" }}>
                  {quotes.map((item) => (
                    <div key={item.id} style={{ margin: "10px 80px" }}>
                      <figure className="quote">
                        <blockquote>{item.body}</blockquote>
                        <figcaption>&mdash; {item.nickname}</figcaption>
                      </figure>
                    </div>
                  ))}
                </Carousel>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={5}>
                <Paper
                  elevation={3}
                  sx={{ margin: "50px 0 50px 50px", padding: "50px" }}
                >
                  <Typography variant={"h6"} textAlign={"center"} fontWeight={"bolder"} mb={"30px"}>Contact Details</Typography>
                  <Typography variany={"body1"} sx={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent: "baseline"}} my={"10px"}><LocalPhone/>&nbsp; <b>Tel:</b> 123456789</Typography>
                  <Typography variany={"body1"} sx={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent: "baseline"}}>
                    <AlternateEmail/>&nbsp; <b>Email:</b> miladhazrati75@gmail.com
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper elevation={3} sx={{ margin: "50px", padding: "50px" }}>
                  <Typography variant={"h6"} textAlign={"center"} fontWeight={"bolder"} mb={"30px"}>Contact Me</Typography>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        value={contactName}
                        id="outlined-basic"
                        label="Your NickName"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={contactEmail}
                        id="outlined-basic"
                        label="Your Email"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={contactMessage}
                        id="outlined-basic"
                        label="Your Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => handleContact()}>Send</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ position: "relative", margin: "50px 0 0 0" }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: "5vh",
                  width: "100%",
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
