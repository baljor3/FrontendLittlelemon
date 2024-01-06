import React, { useState, useRef, useEffect } from "react";




const BookingForm  = () =>{

    const [date, setDate] = useState();
    const [time,setTime] = useState("17:00");
    const [guest, setGuest]  =useState("1");
    const [occasion, setOccasion] = useState("Birthday");
    const [apidata, setData] = useState();
    const [availableTimes, setAvailableTimes] = useState(['17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',]);

   useEffect(() =>{
        fetch('http://localhost:8080/api/getDates')
        .then((response)=>response.json())
        .then((data)=>{
            setData(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[])

    function updatedate(datevalue){
        var temptime = []
        for(let i  =0; i< apidata["data"].length; i++){
            if(datevalue === apidata["data"][i]["date"]
            && apidata["data"][i]["time"] != null
            && apidata["data"][i]["time"] !== ""){
                temptime.push( apidata["data"][i]["time"])

            }
        }
        const temp = ['17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',];
        for(let i  =0; i <temptime.length; i++){
           for(let j = 0; j<temp.length; j++){
            if(temp[j] === temptime[i]){
                temp.splice(j,1)
            }
           }
        }
        setAvailableTimes(temp)
        }
    const addDates = async(date,time,guest,occasion) =>{
    await fetch('http://localhost:8080/api/saveDates',{
        method: 'POST',
        body: JSON.stringify({
           "date": date,
           "time": time,
           "guest":guest,
           "occasion":occasion
        }),
        headers: {
           'Content-type': 'application/json',
        },
        mode :"cors",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
    }

    const handleSubmit = () => {
        if(date === "" || date === null || date === undefined){
            alert("Please select a date")
            return
        }
        addDates(date, time,guest,occasion);
        alert("Your reservations were made!")
     };


    const ChangeDate = (e) => {
    updatedate(e.target.value)
    setDate(e.target.value);
    };

    return(
        <main style={{backgroundColor:"#5C7600",display:"flex" ,justifyContent:"center", alignItems: "center"}}>
            <div style={{justifyContent:"center"}}>
    <form style={{"display": 'grid', "max-width": 200, "gap": 20, alignItems:"center"}} onSubmit={handleSubmit}>
        <label for="res-date" >Choose a Date</label>

        <input type = "date"
        id="res-date"
        required name="date"
        onChange={ChangeDate}
         ></input>

        <label for ="res-time">Choose a Time</label>

        <select id = "res-time"
        onChange={(e)=>{setTime(e.target.value)}}>
        {availableTimes.map((time) =>(
            <option>{time}</option>
        ))}
        </select>

        <label for="guests" >Number of guests</label>

        <input type="number" placeholder="1" min="1" max="10" id="guests"
        onChange={(e)=> {setGuest(e.target.value)}}></input>

        <label for="occasion">Occasion</label>

        <select id="occasion"
        onChange={(e)=> {setOccasion(e.target.value)}} >
            <option>Birthday</option>
            <option>Anniversary</option>
        </select>

        <input type="submit" value="Make Your reservation"></input>
        
    </form>
    </div>
    </main>
    )

}


export default BookingForm;