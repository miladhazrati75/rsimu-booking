import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import fa from 'date-fns/locale/'
import dayjs from "dayjs";
import { enUS, faIR } from "@mui/x-date-pickers/locales";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import faJalaliIR from "date-fns-jalali/locale/fa-jalali-IR";
import { compareAsc, format, newDate } from "date-fns";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BookTime from "@/components/BookTime";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Map from "../../components/Map";
import Carousel from "react-material-ui-carousel";
import { Alert, Grid, Paper, Snackbar, Typography } from "@mui/material";
import { AlarmOn } from "@mui/icons-material";
const faLocale =
  faIR.components.MuiLocalizationProvider.defaultProps.localeText;

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [from, setFrom] = useState(null);
  const [until, setUntil] = useState(null);
  const [index, setIndex] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [address, setAddress] = useState(null);
  const [inputs, setInputs] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [images, setImages] = useState([
    <img src="https://thumbs.dreamstime.com/z/plumber-work-bathroom-plumbing-repair-service-assemble-install-concept-plumber-work-bathroom-plumbing-repair-113995223.jpg" />,
    <img src="https://thumbs.dreamstime.com/z/plumbing-plumber-his-work-toilet-45758903.jpg" />,
  ]);
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      nickname: "Milad Hazrati",
      body: "But web browsers aren’t like web servers. If your back-end code is getting so big that it’s starting to run noticably slowly, you can throw more computing"
    }
  ])
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
  const [bookedList, setBookedList] = useState([
    {
      id: 1,
      bookedTime: 1,
      fullName: "Steve 1",
      address: "United 1",
    },
    {
      id: 2,
      bookedTime: 2,
      fullName: "Steve 2",
      address: "United 2",
    },
    {
      id: 3,
      bookedTime: 1,
      fullName: "Steve 3",
      address: "United 3",
    },
    {
      id: 4,
      bookedTime: 2,
      fullName: "Steve 4",
      address: "United 4",
    },
    {
      id: 5,
      bookedTime: 2,
      fullName: "Steve 5",
      address: "United 5",
    },
  ]);
  const [times, setTimes] = useState([]);
  const handleBookButton = (id) => {
    let a = bookedList.filter((booked) => booked.bookedTime == id);
    let b = availableTimes.find((times) => times.id == id);
    if (a.length >= b.maxClient) {
      alert("max client exceeds");
      return false;
    } else {
      setIndex(id);
      setInputs(true);
    }
  };
  const handleBook = () => {
    let a = bookedList.filter((booked) => booked.bookedTime == index);
    let b = availableTimes.find((times) => times.id == index);
    if (a.length >= b.maxClient) {
      alert("max client exceeds");
      return false;
    } else {
      const newClient = {
        bookedTime: index,
        fullName,
        address,
      };
      setBookedList((prev) => [...prev, newClient]);
    }
  };
  const handleClick = () => {
    if (!from || !until) {
      alert("from or until is empty");
      return false;
    } else if (from.getTime() >= until.getTime()) {
      alert("from is bigger than until");
      return false;
    }
    let a = availableTimes.filter((times) => {
      // console.log("from", from);
      // console.log("times.from", times.from);
      // console.log("until", until);
      // console.log("times.until", times.until);
      // console.log(from.getTime() > times.from.getTime(), from.getTime() < times.until.getTime(), until.getTime() > times.from.getTime(), until.getTime() < times.until.getTime());
      if (
        from.getTime() >= times.from.getTime() &&
        from.getTime() < times.until.getTime()
      ) {
        return true;
      } else if (
        until.getTime() > times.from.getTime() &&
        until.getTime() <= times.until.getTime()
      ) {
        return true;
      }
      return false;
    });
    console.log("a", a);
    if (a.length) {
      alert("overlapping");
      return false;
    }

    setAvailableTimes((items) => [
      ...items,
      {
        from: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          from.getHours(),
          from.getMinutes(),
          0
        ),
        until: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          until.getHours(),
          until.getMinutes(),
          0
        ),
      },
    ]);
  };
  const getTimes = (value) => {
    setSelectedDate(value);
    let startDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      0,
      0,
      0
    ).getTime();
    let endDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      23,
      59,
      0
    ).getTime();
    let a = availableTimes.filter((times) => {
      return (
        (times.from.getTime() > startDate || times.from.getTime() < endDate) &&
        times.until.getTime() > startDate &&
        times.until.getTime() < endDate
      );
    });
    setTimes((times) => [...a]);
  };

  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    getTimes(new Date());
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
                  Plumbing
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
                  {images.map((item) => item)}
                </Carousel>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ height: "auto", padding: "10px 5px" }}
              >
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
            <Typography textAlign={"center"} variant="h6" fontWeight={"bolder"}>
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
                  onChange={(booked) => {
                    setOpenSnackBar(true);
                    setBookedList(booked);
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ height: "auto", padding: "10px 5px" }}
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
            <Typography variant={"h6"} textAlign={"center"} fontWeight={"bolder"}>Customers' Saying</Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ height: "40vh" }}>
                <Carousel sx={{ height: "100%", margin: "10px 80px" }}>
                  {quotes.map((item) => (
                    <div key={item.id}>
                      <figure class="quote">
                        <blockquote>
                          {item.body}
                        </blockquote>
                        <figcaption>
                          &mdash; {item.nickname}
                        </figcaption>
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
              sx={{ position: "relative", margin: "50px 0 0 0" }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: "5vh",
                  width: "100%",
                  backgroundColor: "darkblue",
                  position: "absolute",
                  bottom: 0,
                }}
                textAlign={"center"}
              >
                <Typography variant="body1">
                  <a href="tel:0123456789">0123456789</a> |{" "}
                  <a href="mailto:miladhazrati75@gmail.com">
                    miladhazrati75@gmail.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
