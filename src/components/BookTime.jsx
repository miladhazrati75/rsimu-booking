import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import fa from 'date-fns/locale/'
import dayjs from 'dayjs';
import { enUS, faIR } from '@mui/x-date-pickers/locales';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import faJalaliIR from 'date-fns-jalali/locale/fa-jalali-IR';
import { compareAsc, format, newDate } from 'date-fns'
import { TimeField } from '@mui/x-date-pickers/TimeField';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import Map from './Map'
import dynamic from 'next/dynamic';
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

export default function BookTime({onChange}) {

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
  const [availableTimes, setAvailableTimes] = useState([
      {
          id: 1,
          maxClient: 3,
          from: new Date(2023, 4, 6, 8, 0, 0),
          until: new Date(2023, 4, 6, 10, 0, 0)
      },
      {
          id: 2,
          maxClient: 3,
          from: new Date(2023, 4, 8, 8, 0, 0),
          until: new Date(2023, 4, 8, 10, 0, 0)
      }
  ])
  const [bookedList, setBookedList] = useState([
      {
          id: 1,
          bookedTime: 1,
          fullName: "Steve 1",
          address: "United 1"
      },
      {
          id: 2,
          bookedTime: 2,
          fullName: "Steve 2",
          address: "United 2"
      },
      {
          id: 3,
          bookedTime: 1,
          fullName: "Steve 3",
          address: "United 3"
      },
      {
          id: 4,
          bookedTime: 2,
          fullName: "Steve 4",
          address: "United 4"
      },
      {
          id: 5,
          bookedTime: 2,
          fullName: "Steve 5",
          address: "United 5"
      }
  ])

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
    console.log("wwwww");
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
        onChange([...bookedList, newClient]);
        setBookedList(prev => [...prev, newClient])
        setFullName(null);
        setEmail(null);
        setPhone(null);
        setAddress(null);
        setProblem(null)
    }
    
  }
  const getTimes = (value) => {
    console.log(value);
    setSelectedDate(value)
    let startDate = new Date(value.getFullYear(),value.getMonth(), value.getDate(), 0, 0, 0).getTime();
    let endDate = new Date(value.getFullYear(),value.getMonth(), value.getDate(), 23, 59, 0).getTime();
    let a = availableTimes.filter(times => {
        return (times.from.getTime() > startDate || times.from.getTime() < endDate) && (times.until.getTime() > startDate && times.until.getTime() < endDate)
    });
    setTimes(times => [...a]);

  }
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
              <h2>Times to reserve in {format(selectedDate, "yyyy/MM/dd")}:</h2>
              {times.map((item,index)=>(
                  <>
                      <p key={index} style={{padding: 20, border: "5px dashed grey", backgroundColor: "#ff8800", cursor: "pointer"}} onClick={() => handleBookButton(item.id)}>From: {format(item.from,"HH:mm")} - Until: {format(item.until, "HH:mm")}</p>
                </>
              ))}
              <Button variant="contained" onClick={() => handleBack()}>Back</Button>
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
              <div>
                <Button variant="contained" onClick={handleNext}>Next</Button>
              </div>
            </Box>
            <Button variant="contained" onClick={() => handleBack()}>Back</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Your accurate address</Typography>}
          >
            Fill in the field or click on map
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
                <Button variant="contained" onClick={handleBook}>Contained</Button>
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