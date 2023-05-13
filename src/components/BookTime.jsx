import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import compareAsc from 'date-fns/compareAsc'
import {format} from 'date-fns'
import {TimeField} from '@mui/x-date-pickers/TimeField';
import TextField from '@mui/material/TextField';
import axios from 'axios'
const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function BookTime({onSuccess, onError}) {

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [from, setFrom] = useState(null);
  const [until, setUntil] = useState(null);
  const [index, setIndex] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [inputs, setInputs] = useState(false);
  const [times, setTimes] = useState([])
  const [mapContainer, setMapContainer] = useState(false);
  const [problem, setProblem] = useState(null);
  const [email, setEmail] = useState(null)
  const [availableTimes, setAvailableTimes] = useState([])
  const [bookedList, setBookedList] = useState([])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleBookButton = (id) => {
    let a = bookedList.filter(booked => booked.bookedTime == id);
    let b = availableTimes.find(times => times.id == id);
    if (a.length >= b.maxClient){
        alert("max client exceeds");
        return false;
    } else {
        setIndex(id)
        handleNext()
    }
}
  const handleBook = () => {
    let a = bookedList.filter(booked => booked.bookedTime == index);
    let b = availableTimes.find(times => times.id == index);
    if(!fullName || !email || !phone || !address || !problem){
      alert("empty fields");
      return false;
    }
    if (a.length >= b.maxClient){
        alert("max client exceeds");
        return false;
    } else {
        const newClient = {
            bookedTime: index,
            fullName,
            email,
            phone,
            address,
            problem
        }
        axios.post("/api/settimes", newClient)
        .then(res => {
          onSuccess({ message: res.data?.message, severity: "success"})
        })
        .catch(err => onError({message: err?.response?.data?.message, severity: "error"}))
    }
    
  }
  const getTimes = (value) => {
    setSelectedDate(value);
    axios.post("/api/freetimes", { 
      perDate: true,
      freeTime: value.getTime()
    })
    .then(res => {
      setAvailableTimes(res.data);
    })
    .catch(err => {
      setAvailableTimes([])
    });
  }
  useEffect(() => {
    getTimes(new Date())
  }, [])
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Specify Date</Typography>}
          >
            Specify a date
          </StepLabel>
          <StepContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar onChange={value => {
              getTimes(value);
              handleNext()
            }}/>
            </LocalizationProvider>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Select a Time</Typography>}
          >
            Select your preferred time range
          </StepLabel>
          <StepContent>
            <div>
              {availableTimes.length > 0 ? (<>
                <Typography variant={"body1"} fontWeight={"bolder"}>Times to reserve in {format(selectedDate, "yyyy/MM/dd")}:</Typography>
                {availableTimes.map((item,index)=>(<>
                        <p key={index} style={{padding: 20, border: "5px dashed grey", backgroundColor: "#ff8800", cursor: "pointer"}} onClick={() => handleBookButton(item.id)}>From: {format(new Date(item.from),"HH:mm")} - Until: {format(new Date(item.until), "HH:mm")}</p>
                  </>
                ))}
                </>
              ): (
                <Typography mb={"20px"}>There's no available time on this day. Click on Back and select another day.</Typography>
              )}
              <Button variant="contained" onClick={handleBack} sx={{marginTop: "10px"}}>Back</Button>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Your full Name and Phone Number</Typography>}
          >
            Give Your Contact Info
          </StepLabel>
          <StepContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField id="outlined-basic" label="Your FullName" variant="outlined" onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <TextField id="outlined-basic" label="Your Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <TextField id="outlined-basic" label="Your Phone" variant="outlined" onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <TextField id="outlined-basic" label="How can I help you?" variant="outlined" onChange={(e) => setProblem(e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleNext}>Next</Button>
              </div>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleBack} sx={{marginTop: "10px"}}>Back</Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Your accurate address</Typography>}
          >
            Give your address
          </StepLabel>
          <StepContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(e) => setAddress(e.target.value)} />
              </div>
              {/* <div>
              <FormGroup>
                <FormControlLabel control={<Switch onChange={checked => setMapContainer(!mapContainer)} />} label="Use Map" />
              </FormGroup>
              </div>
              {mapContainer && <div><Map text="text"/></div>} */}
              <div>
                <Button variant="contained" onClick={handleBook}>Book</Button>
              </div>
            </Box>
            <Button variant="contained" onClick={() => handleBack()}>Back</Button>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}