import React, { useState, useEffect } from "react";
import moment from 'moment'
import '../Css/booking.css'


const BookingForm  = () =>{

    const [date, setDate] = useState();
    const [time,setTime] = useState("8:00am");
    const [guest, setGuest]  =useState(1);
    const [occasion, setOccasion] = useState("Birthday");
    const [email, setEmail] =  useState()
    const [apidata, setData] = useState();
    const [availableTimes, setAvailableTimes] = useState(['8:00am',
    '8:30am',
    '9:00am',
    '9:30am',
    '10:00am',
    '10:30am',
    '11:00am',
    '11:30am',
'12:00pm',
'12:30pm',
'1:00pm',
'1:30pm']);

   useEffect(() =>{
        fetch('https://backend-littlelemon.vercel.app/api/getDate')
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            console.log(data.length)
            setData(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[])

    function updatedate(datevalue){
        var temptime = []
        for(let i  =0; i< apidata.length; i++){
            let changeDate=moment(apidata[i]["date"])
            changeDate=changeDate.format("YYYY-MM-DD")
            console.log(changeDate)
            if(datevalue === changeDate
            && apidata[i]["time"] != null
            && apidata[i]["time"] !== ""){
                temptime.push( apidata[i]["time"])

            }
        }
        console.log("temptime",temptime)
        const temp = ['8:00am',
        '8:30am',
        '9:00am',
        '9:30am',
        '10:00am',
        '10:30am',
        '11:00am',
        '11:30am',
    '12:00pm',
    '12:30pm',
    '1:00pm',
    '1:30pm'];
        for(let i  =0; i <temptime.length; i++){
           for(let j = 0; j<temp.length; j++){
            if(temp[j] === temptime[i]){
                temp.splice(j,1)
            }
           }
        }
        setAvailableTimes(temp)
        }
    const addDates = async(date,time,guest,occasion,email) =>{
    await fetch('https://backend-littlelemon.vercel.app/api/saveDate',{
        method: 'POST',
        body: JSON.stringify({
           "date": date,
           "time": time,
           "noguests":guest,
           "occasion":occasion,
           "email":email
        }),
        headers: {
           'Content-type': 'application/json',
        },
        mode :"cors",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        }).catch((err)=>{
            console.log(err.message);
        });
    }

    const handleSubmit = (e) => {
        if(date === "" || date === null || date === undefined){
            alert("Please select a date")
            return
        }
        if(email === "" || email === null || email === undefined){
            alert("please enter an email")
            return
        }
        addDates(date, time,guest,occasion,email);
        alert("Your reservations were made!")
        e.preventDefault()
     };


    const ChangeDate = (e) => {
    updatedate(e.target.value)
    setDate(e.target.value);
    };

    return(
        <main style={{backgroundColor:"#5C7600",height:"100vh",display:"flex" ,justifyContent:"center", alignItems: "center", paddingBottom:'5px'}}>
            <div style={{justifyContent:"center"}}>
    <form style={{"display": 'grid', "max-width": 200, "gap": 20, alignItems:"center"}} onSubmit={handleSubmit}>
        <label for="res-date" className="label">Choose a Date</label>

        <input type = "date"
        id="res-date"
        required name="date"
        onChange={ChangeDate}
        className="input-date"
         ></input>

        <label for ="res-time" className="label">Choose a Time</label>

        <select id = "res-time"
        className="select-dropdown"
        onChange={(e)=>{setTime(e.target.value)}}>
        {availableTimes.map((time) =>(
            <option>{time}</option>
        ))}
        </select>

        <label for="guests" className="label">Number of guests</label>

        <input type="number" placeholder="1" min="1" max="10" id="guests"
        className="input-number"
        onChange={(e)=> {setGuest(e.target.value)}}></input>

        <label for="occasion" className="label">Occasion</label>

        <select id="occasion"
        className="select-dropdown"
        onChange={(e)=> {setOccasion(e.target.value)}} >
            <option>Birthday</option>
            <option>Anniversary</option>
        </select>

        <label for="email" className="label">Email</label>
        <input type = "text" className="input-text" onChange={(e)=>{setEmail(e.target.value)}}></input>

        <input type="submit" className="input-submit" value="Make Your reservation"></input>
        
    </form>
    </div>
    </main>
    )

}


export default BookingForm;