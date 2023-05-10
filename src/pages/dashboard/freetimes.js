import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import fa from 'date-fns/locale/'
import dayjs from 'dayjs';
import { enUS, faIR } from '@mui/x-date-pickers/locales';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import faJalaliIR from 'date-fns-jalali/locale/fa-jalali-IR';
import { compareAsc, format, newDate } from 'date-fns'
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import moment from  "moment-jalaali"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const faLocale = faIR.components.MuiLocalizationProvider.defaultProps.localeText;

export default function Dashboard(){
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [from, setFrom] = useState(null);
    const [until, setUntil] = useState(null);
    const [repeat, setRepeat] = useState(0);
    const [maxClient, setMaxClient] = useState(1);
    const [index, setIndex] = useState(null);
    const [booked, setBooked] = useState(false);
    const [bookedId, setBookedId] = useState(null);
    const [around, setAround] = useState(null);
    const [freeTimes, setFreeTimes] = useState([
        {
            id: 1,
            from: new Date(2023, 4, 6, 8, 0, 0),
            until: new Date(2023, 4, 6, 10, 0, 0)
        },
        {
            id: 2,
            from: new Date(2023, 4, 4, 8, 0, 0),
            until: new Date(2023, 4, 4, 10, 0, 0)
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
    const [times, setTimes] = useState([])
    const handleChangeRepeat = (e) => {
        setRepeat(e.target.value);
    };
    const handleChangeMaxClient = (e) => {
        setMaxClient(e.target.value);
    };
    const handleEditButton = (obj) => {
        setFrom(obj?.from);
        setUntil(obj?.until);
        setMaxClient(obj?.maxClient);
    }
    const handleAround = () => {
        let time = bookedList;
        let c = bookedList.find(time => time.id == bookedId);
        let d = freeTimes.find(time => time?.id == c.bookedTime);
        let e = new Date(d.from.getFullYear(), d.from.getMonth(), d.from.getDate(), around.getHours(), around.getMinutes(), 0);
        if (e.getTime() <= d.from.getTime() || e.getTime() >= d.until.getTime()){
            alert("it is not in range");
        } else {
            time[time.indexOf(c)].around = format(around, "HH:mm");
            setBookedList(prev => [...time]);
        }
    }
    const handleClick = () => {
        if(!from || !until){
            alert("from or until is empty");
            return false;
        } else if (from.getTime() >= until.getTime()){
            alert("from is bigger than until")
            return false;
        }
        if (index != null) {
            console.log("index",index);
            let times = freeTimes;
            times[index].from = new Date(times[index].from.getFullYear(), times[index].from.getMonth(), times[index].from.getDate(), from.getHours(), from.getMinutes(), 0)
            times[index].until = new Date(times[index].until.getFullYear(), times[index].until.getMonth(), times[index].until.getDate(), until.getHours(), until.getMinutes(), 0)
            times[index].maxClient = maxClient;
            setFreeTimes(prev => [...times]);
        } else {
            console.log("noindex");
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
                         
                        // console.log("from", from);
                        // console.log("times.from", times.from);
                        // console.log("until", until);
                        // console.log("times.until", times.until);
                        // console.log(from.getTime() > times.from.getTime(), from.getTime() < times.until.getTime(), until.getTime() > times.from.getTime(), until.getTime() < times.until.getTime());
                        if (fromMoment.unix() * 1000 >= times.from.getTime() && fromMoment.unix() * 1000 < times.until.getTime()){
                            return true;
                        } else if(untilMoment.unix() * 1000 > times.from.getTime() && untilMoment.unix() * 1000 <=  times.until.getTime()){
                            return true;
                        }
                        return false;
                    });
                    if(a.length){
                        alert("overlapping with " + a.length + " free times.");
                    } else {
                        console.log("qqqq",{
                            maxClient: maxClient,
                            from: new Date(fromMoment.year(), fromMoment.month(), fromMoment.date(), fromMoment.hours(), fromMoment.minutes(), 0),
                            until: new Date(untilMoment.year(), untilMoment.month(), untilMoment.date(), untilMoment.hours(), untilMoment.minutes(), 0)
                        });
                        console.log("eeee", freeTimes);
                        // let tmp = freeTimes;
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
                    // console.log("from", from);
                    // console.log("times.from", times.from);
                    // console.log("until", until);
                    // console.log("times.until", times.until);
                    // console.log(from.getTime() > times.from.getTime(), from.getTime() < times.until.getTime(), until.getTime() > times.from.getTime(), until.getTime() < times.until.getTime());
                    if (from.getTime() >= times.from.getTime() && from.getTime() < times.until.getTime()){
                        return true;
                    } else if(until.getTime() > times.from.getTime() && until.getTime() <=  times.until.getTime()){
                        return true;
                    }
                    return false;
                });
                if(a.length){
                    alert("overlapping");
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
        setSelectedDate(value)
        console.log("q",Array.isArray(freeTimes));
        let startDate = new Date(value.getFullYear(),value.getMonth(), value.getDate(), 0, 0, 0).getTime();
        let endDate = new Date(value.getFullYear(),value.getMonth(), value.getDate(), 23, 59, 0).getTime();
        let a = freeTimes.filter(times => {
            console.log(times.from.getTime() > startDate, times.from.getTime() < endDate, times.until.getTime() > startDate , times.until.getTime() < endDate);
            return (times.from.getTime() > startDate || times.from.getTime() < endDate) && (times.until.getTime() > startDate && times.until.getTime() < endDate)
        });
        console.log("a",a);
        setTimes(a);

    }

    useEffect(() => {
        getTimes(new Date());
    },[])
    return (
        <>
            <CssBaseline />
            <Container >
                <Box sx={{ height: '100vh' }} >
                    <p>اینجا قراره که لوله کش به زمان های درخواستی مشتری ها زمان دقیق بده و برای مشتری ایمیل بره که فلان ساعت لوله کش میاد</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar onChange={value => getTimes(value)}/>
                        <TimeField
                            label="From"
                            value={from}
                            onChange={(newValue) => {
                                    if(newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setFrom(a)
                                    }
                                }
                            }
                            format="HH:mm"
                        />
                        <TimeField
                            label="until"
                            value={until}
                            onChange={(newValue) => {
                                    if (newValue){
                                        let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                        setUntil(a);
                                    }
                                }
                            }
                            format="HH:mm"
                        />
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
                        <Button variant="contained" onClick={handleClick}>Contained</Button>


                    
                        {booked && (
                            <>
                                <TimeField
                                    label="Around"
                                    onChange={(newValue) => {
                                            if (newValue){
                                                // let time = bookedList.find(time => time.bookedTime == bookedId)
                                                // let a = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), newValue.getHours(), newValue.getMinutes(), 0);
                                                // setUntil(a);
                                                setAround(newValue)
                                            }
                                        }
                                    }
                                    format="HH:mm"
                                />
                                <Button variant="contained" onClick={handleAround}>Contained</Button>
                            </>
                        )}
                    <div>
                        <h2>My Free Times:</h2>
                        {times.map((item,index)=>(
                            <>
                                <p key={index}>From: {format(item.from,"yyyy/MM/dd HH:mm")} - until: {format(item.until, "yyyy/MM/dd HH:mm")}</p>
                                <Button variant="contained" onClick={() => {
                                    setIndex(freeTimes.indexOf(item));
                                    handleEditButton(item);
                                }}>Edit</Button>
                            </>
                        ))}
                    </div>

                    <div>
                        <h2>Reserved Times:</h2>
                        {bookedList.map((item,index)=> {
                            let time = freeTimes.find(time => time?.id == item.bookedTime);
                            return <>
                                <p key={index}>id: {item.id} - FullName: {item.fullName} - Address: {item.address} - time: {format(time?.from, "yyyy/MM/dd HH:mm")} until {format(time?.until, "yyyy/MM/dd HH:mm")} - around: {item?.around}</p>
                                <Button variant="contained" onClick={() => {
                                    setBooked(true);
                                    setBookedId(item.id);
                                }}>Assign</Button>
                            </>
                        })}
                    </div>
                    </LocalizationProvider>
                </Box>
            </Container>
        </>
    );
}