import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BookTime from "@/components/BookTime";
import NavDashboard from "@/components/NavDashboard";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Map from "../../components/Map";
import Carousel from "react-material-ui-carousel";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {format} from 'date-fns'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TimeField} from '@mui/x-date-pickers/TimeField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import moment from 'moment'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Booking() {
  const [contacts, setContacts] = useState([
    {
      nickname: "Milad Hazrati",
      email: "mmmmmmmm@mmmmmmm.mmmmmm",
      message: "Hello"
    }
  ])

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [from, setFrom] = useState(null);
  const [until, setUntil] = useState(null);
  const [index, setIndex] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [address, setAddress] = useState(null);
  const [inputs, setInputs] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [contactName, setContactName] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [contactMessage, setContactMessage] = useState(null);
  const [repeat, setRepeat] = useState(0);
  const [maxClient, setMaxClient] = useState(1);
  const [message, setMessage] = useState(null)
  const [freeTimes, setFreeTimes] = useState([
    {
      id: 1,
      maxClient: 3,
      from: new Date(2023, 4, 6, 8, 0, 0),
      until: new Date(2023, 4, 6, 10, 0, 0),
    },
    {
      id: 2,
      maxClient: 3,
      from: new Date(2023, 4, 6, 10, 0, 0),
      until: new Date(2023, 4, 6, 12, 0, 0),
    },
    {
      id: 3,
      maxClient: 3,
      from: new Date(2023, 4, 6, 12, 0, 0),
      until: new Date(2023, 4, 6, 14, 0, 0),
    },
    {
      id: 4,
      maxClient: 3,
      from: new Date(2023, 4, 6, 14, 0, 0),
      until: new Date(2023, 4, 6, 16, 0, 0),
    },
    {
      id: 5,
      maxClient: 3,
      from: new Date(2023, 4, 8, 8, 0, 0),
      until: new Date(2023, 4, 8, 10, 0, 0),
    },
  ])
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
      from: new Date(2023, 4, 6, 10, 0, 0),
      until: new Date(2023, 4, 6, 12, 0, 0),
    },
    {
      id: 3,
      maxClient: 3,
      from: new Date(2023, 4, 6, 12, 0, 0),
      until: new Date(2023, 4, 6, 14, 0, 0),
    },
    {
      id: 4,
      maxClient: 3,
      from: new Date(2023, 4, 6, 14, 0, 0),
      until: new Date(2023, 4, 6, 16, 0, 0),
    },
    {
      id: 5,
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
  const handleChangeRepeat = (e) => {
    setRepeat(e.target.value);
  };
  const handleChangeMaxClient = (e) => {
      setMaxClient(e.target.value);
  };
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
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  const handleSetFreeTimes = (data) => {
    axios.post("/api/freetimes", data)
    .then(res => {
      getTimes(selectedDate)
      setMessage({ message: res.data?.message, severity: "success"})
      setOpenSnackBar(true);
    })
    .catch(err => {
      setMessage({ message: err.response?.data?.message, severity: "error"})
      setOpenSnackBar(true);
    });
  }
  
  
  const handleSetFreeTime = () => {
    if(!from || !until){
        setMessage({message:"From or Until is required.", severity: "error"});
        setOpenSnackBar(true)
        return false;
    } else if (from >= until){
        setMessage({ message:"from is bigger than until", severity: "error"})
        setOpenSnackBar(true)
        return false;
    }
    if (index != null) {
        let a = freeTimes.filter(times => {
          if(times?.id == index){
            return false;
          } else{
            if (from >= times.from && from < times.until){
                return true;
            } else if(until > times.from && until <=  times.until){
                return true;
            }
            return false;
          }
        });
        if(a.length){
            setMessage({message:"overlapping", success: "error"});
            setOpenSnackBar(true)
            return false;
        }
        let times = freeTimes.find(time => time.id == index);

        let editTime = {
          isUpdate: true,
          id: times.id,
          from: new Date(new Date(times.from).getFullYear(), new Date(times.from).getMonth(), new Date(times.from).getDate(), new Date(from).getHours(), new Date(from).getMinutes(), 0).getTime(),
          until: new Date(new Date(times.until).getFullYear(), new Date(times.until).getMonth(), new Date(times.until).getDate(), new Date(until).getHours(), new Date(until).getMinutes(), 0).getTime(),
          maxClient: maxClient,
          
        }
        // setFreeTimes(prev => [...times]);
        handleSetFreeTimes(editTime);
        setIndex(null);
        setTabIndex(1)
    } else {
        if (repeat){
            let fromMoment = moment(from);
            let untilMoment = moment(until);
            const newTime = {
              maxClient: maxClient,
              from: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), from.getHours(), from.getMinutes(), 0).getTime(),
              until: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), until.getHours(), until.getMinutes(), 0).getTime()
            }
            handleSetFreeTimes(newTime)
            Array.from({length: repeat}, (item, index) => {
                fromMoment.add(1, 'day');
                untilMoment.add(1, 'day');
                
                let a = freeTimes.filter(times => {
                    if (fromMoment.unix() * 1000 >= times.from && fromMoment.unix() * 1000 < times.until){
                        return true;
                    } else if(untilMoment.unix() * 1000 > times.from && untilMoment.unix() * 1000 <=  times.until){
                        return true;
                    }
                    return false;
                });
                if(a.length){
                    setMessage({message:"overlapping with " + a.length + " free times.", severity: "error"});
                    setOpenSnackBar(true)
                } else {
                    let tmp = {
                        maxClient: maxClient,
                        from: new Date(fromMoment.year(), fromMoment.month(), fromMoment.date(), fromMoment.hours(), fromMoment.minutes(), 0).getTime(),
                        until: new Date(untilMoment.year(), untilMoment.month(), untilMoment.date(), untilMoment.hours(), untilMoment.minutes(), 0).getTime()
                    };
                    handleSetFreeTimes(tmp)
                }
        
                
            });
        } else {
            let a = freeTimes.filter(times => {
                if (from.getTime() >= times.from && from.getTime() < times.until){
                    return true;
                } else if(until.getTime() > times.from && until.getTime() <=  times.until){
                    return true;
                }
                return false;
            });
            if(a.length){
                setMessage({message:"overlapping", success:"error"});
                setOpenSnackBar(true)
                return false;
            }
            
            const newTime = {
              maxClient: maxClient,
              from: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), from.getHours(), from.getMinutes(), 0).getTime(),
              until: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), until.getHours(), until.getMinutes(), 0).getTime()
          }
            handleSetFreeTimes(newTime);
        }
        
    }
    
  }
  const getTimes = (value) => {
    setSelectedDate(value);
    axios.post("/api/freetimes", { 
      perDate: true,
      freeTime: value.getTime()
    })
    .then(res => {
      setFreeTimes(res.data);
    })
    .catch(err => {
      setMessage({message: "Something went wrong.", severity: "error"})
      setOpenSnackBar(true);
      setFreeTimes([]);
    });
    // setSelectedDate(value);
    // let startDate = new Date(
    //   value.getFullYear(),
    //   value.getMonth(),
    //   value.getDate(),
    //   0,
    //   0,
    //   0
    // ).getTime();
    // let endDate = new Date(
    //   value.getFullYear(),
    //   value.getMonth(),
    //   value.getDate(),
    //   23,
    //   59,
    //   0
    // ).getTime();
    // let a = freeTimes.filter((times) => {
    //   return (
    //     (times.from.getTime() > startDate || times.from.getTime() < endDate) &&
    //     times.until.getTime() > startDate &&
    //     times.until.getTime() < endDate
    //   );
    // });
    // setTimes((times) => [...a]);
  };

  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const handleEditButton = (obj) => {
    setIndex(obj?.id)
    setFrom(obj?.from);
    setUntil(obj?.until);
    setMaxClient(obj?.maxClient);
    setTabIndex(2)
  }
  const handleDeleteButton = (obj) => {
    axios.post("/api/freetimes", {isDelete: true, ...obj})
    .then(res => getTimes(selectedDate))
    .catch(err => {
      setMessage({message:"Something went wrong.", severity: "error"})
      setOpenSnackBar(true);
    })
  }

  useEffect(() => {
    getTimes(new Date());
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={message?.severity}
          sx={{ width: "100%" }}
        >
          {message?.message}
          {/* Your appointment is successfully booked. I will be there ;) */}
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
              <Grid item xs={12} sx={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant={"h3"}>Set Free Times</Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: 0}} >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{padding:0}}
                >
                  <Grid item xs={12} sm={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding:0 }} >
                    <DateCalendar onChange={value => {
                      getTimes(value);
                    }}/>
                  </Grid>
                  <Grid item xs={12} sm={7} sx={{ padding: 0, display: "flex", justifyContent: "center"}}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Set New" {...a11yProps(0)} />
                        <Tab label="Free Times" {...a11yProps(1)} />
                        {index && (<Tab label="Edit Existing" {...a11yProps(2)} />)}
                      </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} index={0}>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={2}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="From"
                            value={from}
                            fullWidth
                            onChange={(newValue) => {
                                    if(newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setFrom(a)
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="Until"
                            value={until}
                            fullWidth
                            onChange={(newValue) => {
                                    if (newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setUntil(a);
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Select
                            labelId="repeat in future days"
                            id="demo-simple-select"
                            value={repeat}
                            label="Repeat"
                            onChange={handleChangeRepeat}
                          >
                            <MenuItem value={0}>No Repeat</MenuItem>
                            <MenuItem value={1}>1 Day</MenuItem>
                            <MenuItem value={2}>2 Days</MenuItem>
                            <MenuItem value={3}>3 Days</MenuItem>
                            <MenuItem value={4}>4 Days</MenuItem>
                            <MenuItem value={5}>5 Days</MenuItem>
                            <MenuItem value={6}>6 Days</MenuItem>
                            <MenuItem value={7}>7 Days</MenuItem>
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Select
                              labelId="max client in this range"
                              id="demo-simple-select"
                              value={maxClient}
                              label="Max Client"
                              onChange={handleChangeMaxClient}
                          >
                              <MenuItem value={1}>1 Client</MenuItem>
                              <MenuItem value={2}>2 Clients</MenuItem>
                              <MenuItem value={3}>3 Clients</MenuItem>
                              <MenuItem value={4}>4 Clients</MenuItem>
                              <MenuItem value={5}>5 Clients</MenuItem>
                              <MenuItem value={6}>6 Clients</MenuItem>
                              <MenuItem value={7}>7 Clients</MenuItem>
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Button variant="contained" onClick={handleSetFreeTime}>Contained</Button>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                      <div style={{margin: "0 20px"}}>
                        {freeTimes.length > 0 ? (<>
                          <Typography variant={"body1"} fontWeight={"bolder"}>Times to reserve in {format(selectedDate, "yyyy/MM/dd")}:</Typography>
                          {freeTimes.map((item,index)=>(
                              <>
                                <div key={index} style={{padding: "20px", border: "5px dashed grey", backgroundColor: "#ff8800"}} >
                                <Grid
                                  container
                                  rowSpacing={1}
                                  justifyContent={"space-between"}
                                >
                                  <Grid
                                    item
                                    xs={8}
                                  >
                                    <Typography variant="body1">From: {format(item.from,"HH:mm")} - Until: {format(item.until, "HH:mm")}</Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                  >
                                    <Button variant="contained" onClick={() => handleEditButton(item)}>Edit</Button>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                  >
                                    <Button variant="contained" onClick={() => handleDeleteButton(item)}>Delete</Button>
                                  </Grid>
                                </Grid>
                                </div>
                              </>
                          ))}
                        </>
                        ): (
                          <Typography mb={"20px"}>There's no available time on this day. Click on Back and select another day.</Typography>
                        )}
                      </div>
                    </TabPanel>
                    {index && (<TabPanel value={tabIndex} index={2}>
                      <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={2}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="From"
                            value={from}
                            fullWidth
                            onChange={(newValue) => {
                                    if(newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setFrom(a)
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="Until"
                            value={until}
                            fullWidth
                            onChange={(newValue) => {
                                    if (newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setUntil(a);
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Select
                              labelId="max client in this range"
                              id="demo-simple-select"
                              value={maxClient}
                              label="Max Client"
                              onChange={handleChangeMaxClient}
                          >
                              <MenuItem value={1}>1 Client</MenuItem>
                              <MenuItem value={2}>2 Clients</MenuItem>
                              <MenuItem value={3}>3 Clients</MenuItem>
                              <MenuItem value={4}>4 Clients</MenuItem>
                              <MenuItem value={5}>5 Clients</MenuItem>
                              <MenuItem value={6}>6 Clients</MenuItem>
                              <MenuItem value={7}>7 Clients</MenuItem>
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Button variant="contained" onClick={handleSetFreeTime}>Contained</Button>
                        </Grid>
                      </Grid>
                    </TabPanel>)}
                  </Box>
                    {/* <Paper elevation={3} sx={{margin: "0 30px", padding: "20px"}}>
                      <Typography variant="body1">Specify free "From - Until" time ranges in {format(selectedDate, "yyyy/MM/dd")}:</Typography>
                      <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={2}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="From"
                            value={from}
                            fullWidth
                            onChange={(newValue) => {
                                    if(newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setFrom(a)
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                        >
                          <TimeField
                            label="Until"
                            value={until}
                            fullWidth
                            onChange={(newValue) => {
                                    if (newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setUntil(a);
                                    }
                                }
                            }
                            format="HH:mm"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Select
                            labelId="repeat in future days"
                            id="demo-simple-select"
                            value={repeat}
                            label="Repeat"
                            onChange={handleChangeRepeat}
                          >
                            <MenuItem value={0}>No Repeat</MenuItem>
                            <MenuItem value={1}>1 Day</MenuItem>
                            <MenuItem value={2}>2 Days</MenuItem>
                            <MenuItem value={3}>3 Days</MenuItem>
                            <MenuItem value={4}>4 Days</MenuItem>
                            <MenuItem value={5}>5 Days</MenuItem>
                            <MenuItem value={6}>6 Days</MenuItem>
                            <MenuItem value={7}>7 Days</MenuItem>
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Select
                              labelId="max client in this range"
                              id="demo-simple-select"
                              value={maxClient}
                              label="Max Client"
                              onChange={handleChangeMaxClient}
                          >
                              <MenuItem value={1}>1 Client</MenuItem>
                              <MenuItem value={2}>2 Clients</MenuItem>
                              <MenuItem value={3}>3 Clients</MenuItem>
                              <MenuItem value={4}>4 Clients</MenuItem>
                              <MenuItem value={5}>5 Clients</MenuItem>
                              <MenuItem value={6}>6 Clients</MenuItem>
                              <MenuItem value={7}>7 Clients</MenuItem>
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Button variant="contained" onClick={handleSetFreeTime}>Contained</Button>
                        </Grid>
                      </Grid>
                    </Paper> */}
                  </Grid>
                  <Grid item xs={12} sm={7} sx={{ padding: 0, width:"100%"}}>
                    {/* <div style={{margin: "0 30px"}}>
                    {times.length > 0 ? (<>
                      <Typography variant={"body1"} fontWeight={"bolder"}>Times to reserve in {format(selectedDate, "yyyy/MM/dd")}:</Typography>
                      {times.map((item,index)=>(
                          <>
                            <p key={index} style={{padding: "20px", border: "5px dashed grey", backgroundColor: "#ff8800", cursor: "pointer"}} onClick={() => handleBookButton(item.id)}>From: {format(item.from,"HH:mm")} - Until: {format(item.until, "HH:mm")}</p>
                          </>
                      ))}
                    </>
                    ): (
                      <Typography mb={"20px"}>There's no available time on this day. Click on Back and select another day.</Typography>
                    )}
                    </div> */}
                  </Grid>
                </Grid>
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
