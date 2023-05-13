import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
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
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {format} from 'date-fns'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TimeField} from '@mui/x-date-pickers/TimeField';
import axios from 'axios'
export default function Booking({hello}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [from, setFrom] = useState(null);
  const [until, setUntil] = useState(null);
  const [index, setIndex] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [maxClient, setMaxClient] = useState(1);
  const [message, setMessage] = useState(null);
  const [aroundOpen, setAroundOpen] = useState(false);
  const [around, setAround] = useState(null);
  const [bookedId, setBookedId] = useState(null);
  const [freeTimes, setFreeTimes] = useState([])
  const [bookedList, setBookedList] = useState([]);
  const handleAround = () => {
    axios.post("/api/settimes", {bookedId, around})
    .then(res => {
      setMessage({message: res.data?.message, severity: "success"})
      setOpenSnackBar(true);
      getTimes(selectedDate)
    })
    .catch(err=> {
      setMessage({message: err?.response?.data?.message, severity: "error"})
      setOpenSnackBar(true)
    });
  }
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
  };
  
  const handleSetFreeTime = () => {
    if(!from || !until){
        setNotificationMessage("From or Until is required.");
        setOpenSnackBar(true)
        return false;
    } else if (from.getTime() >= until.getTime()){
        setNotificationMessage("from is bigger than until")
        setOpenSnackBar(true)
        return false;
    }
    if (index != null) {
        let a = freeTimes.filter(times => {
          if(times?.id == index){
            return false;
          } else{
            if (from.getTime() >= times.from.getTime() && from.getTime() < times.until.getTime()){
                return true;
            } else if(until.getTime() > times.from.getTime() && until.getTime() <=  times.until.getTime()){
                return true;
            }
            return false;
          }
        });
        if(a.length){
            setNotificationMessage("overlapping");
            setOpenSnackBar(true)
            return false;
        }
        let times = freeTimes;
        times[index].from = new Date(times[index].from.getFullYear(), times[index].from.getMonth(), times[index].from.getDate(), from.getHours(), from.getMinutes(), 0)
        times[index].until = new Date(times[index].until.getFullYear(), times[index].until.getMonth(), times[index].until.getDate(), until.getHours(), until.getMinutes(), 0)
        times[index].maxClient = maxClient;
        setFreeTimes(prev => [...times]);
        setIndex(null);
        setFrom(null);
        setUntil(null);
        setMaxClient(null);
        setTabIndex(1)
    } else {
        if (repeat){
            let fromMoment = moment(from);
            let untilMoment = moment(until);
            setFreeTimes(items => [...items, {
                maxClient: maxClient,
                from: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), from.getHours(), from.getMinutes(), 0),
                until: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), until.getHours(), until.getMinutes(), 0)
            }])
            Array.from({length: repeat}, (item, index) => {
                fromMoment.add(1, 'day');
                untilMoment.add(1, 'day');
                let a = freeTimes.filter(times => {
                    if (fromMoment.unix() * 1000 >= times.from.getTime() && fromMoment.unix() * 1000 < times.until.getTime()){
                        return true;
                    } else if(untilMoment.unix() * 1000 > times.from.getTime() && untilMoment.unix() * 1000 <=  times.until.getTime()){
                        return true;
                    }
                    return false;
                });
                if(a.length){
                    setNotificationMessage("overlapping with " + a.length + " free times.");
                    setOpenSnackBar(true)
                } else {
                    let tmp = {
                        maxClient: maxClient,
                        from: new Date(fromMoment.year(), fromMoment.month(), fromMoment.date(), fromMoment.hours(), fromMoment.minutes(), 0),
                        until: new Date(untilMoment.year(), untilMoment.month(), untilMoment.date(), untilMoment.hours(), untilMoment.minutes(), 0)
                    };
                    setFreeTimes(prev => [...prev, tmp])
                }
        
                
            });
        } else {
            let a = freeTimes.filter(times => {
                if (from.getTime() >= times.from.getTime() && from.getTime() < times.until.getTime()){
                    return true;
                } else if(until.getTime() > times.from.getTime() && until.getTime() <=  times.until.getTime()){
                    return true;
                }
                return false;
            });
            if(a.length){
                setNotificationMessage("overlapping");
                setOpenSnackBar(true)
                return false;
            }
            setFreeTimes(items => [...items, {
                maxClient: maxClient,
                from: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), from.getHours(), from.getMinutes(), 0),
                until: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), until.getHours(), until.getMinutes(), 0)
            }])
        }
        
    }
    
  }
  const getTimes = (value) => {
    setSelectedDate(value);
    axios.post("/api/settimes", { 
      perDate: true,
      freeTime: value.getTime()
    })
    .then(res => {
      setBookedList(res.data);
    })
    .catch(err => {
      setMessage({message: "Something went wrong.", severity: "error"}) 
      setOpenSnackBar(true)
      setBookedList([])
    });
  }


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
    setRepeat(obj?.repeat)
    setTabIndex(2)
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
                <Typography variant={"h3"}>Assign Times</Typography>
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
                      <div style={{margin: "0 20px"}}>
                        {bookedList.length > 0 ? (<>
                          <Typography variant={"body1"} fontWeight={"bolder"}>Times reserved in {format(selectedDate, "yyyy/MM/dd")}:</Typography>
                          {bookedList.map((item,i)=>(
                              <>
                                <div key={i} style={{padding: "20px", border: "5px dashed grey", backgroundColor: "#ff8800"}} >
                                <Grid
                                  container
                                  rowSpacing={1}
                                  justifyContent={"space-between"}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                  >
                                    <Typography variant="body1">FullName: {item?.fullName}</Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                  >
                                    <Typography variant="body1">Address: {item?.address}</Typography>
                                  </Grid>
                                  {item?.from && (
                                    <Grid
                                      item
                                      xs={12}
                                    >
                                      <Typography variant="body1">From: {format(new Date(item.from),"HH:mm")} - Until: {format(new Date(item.until), "HH:mm")} {item?.around && (<> - Around: {format(new Date(item.around), "HH:mm")}</>)}</Typography>
                                    </Grid>
                                  )}
                                  {aroundOpen && item?.id == bookedId && (
                                    <Grid
                                      item
                                      xs={12}
                                      sx={{display:"flex", alignItems:"baseline", gap:"10px"}}
                                    >
                                      <TimeField
                                        label="Around"
                                        value={around}
                                        onChange={(newValue) => setAround(newValue)}
                                        format="HH:mm"
                                      />
                                      
                                      <Button variant="contained" onClick={() => handleAround()}>Set</Button>
                                    </Grid>
                                  )}
                                  {(!aroundOpen || item?.id != bookedId) &&(
                                    <Grid
                                    item
                                    xs={4}
                                  >
                                    <Button variant="contained" onClick={() => {
                                      setIndex(item.bookedTime);
                                      setBookedId(item.id);
                                      setAroundOpen(true)
                                    }}>Assign</Button>
                                  </Grid>
                                  )}
                                </Grid>
                                </div>
                              </>
                          ))}
                        </>
                        ): (
                          <Typography mb={"20px"}>There's no reserved on this day. select another day.</Typography>
                        )}
                      </div>
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

export async function getServerSideProps(context) {
  return {
    props: {
      hello: "world",
    }, // will be passed to the page component as props
  };
}
