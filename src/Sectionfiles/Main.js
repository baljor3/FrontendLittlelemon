import React, {useState, useReducer, useEffect} from "react"
import {Link }from 'react-router-dom';
import "../Css/Main.css"
import bruchetta from  "../asset/bruchetta.png"
import greek from "../asset/greek salad.jpg"
import lemondessert from  "../asset/lemon dessert.jpg"
import MarioA from "../asset/Mario and Adrian A.jpg"
import BookingForm from "./Booking"
import EllipsisTextContainer from './EllipsisTextContainer';
import Cookies from "js-cookie";



const  Main = () =>{
    const [productid, setProductID] = useState()
    var [numberData, setNumeberData] = useState([]);
    var [reviewData, setreviewData] = useState([]);
    const [updateEffect,setUpdateEffect] = useState(false);
    const jwtToken = Cookies.get('jwt_authorization')
    var count = 0;

    const additem = async(v) =>{
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('http://localhost:8080/api/additem', {
            method: "POST",
            body: JSON.stringify({
              "productid": v
            }),
            headers: {
              "token": jwtToken,
              'Content-type': 'application/json'
            }
          }).then((data)=>{
            if(data.status === 401){
                alert("log in")
            }
          });
          setUpdateEffect(prev => !prev);
        } catch (error) {
            console.error('Error:', error);
            alert("Login to order items");
        }
    }

    const minusitem = async(v) =>{
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('http://localhost:8080/api/deleteitem', {
            method: "POST",
            body: JSON.stringify({
              "productid": v
            }),
            headers: {
              "token": jwtToken,
              'Content-type': 'application/json'
            }
          });
          setUpdateEffect(prev => !prev);
        } catch (error) {
            console.error('Error:', error);
            alert("Login to order items");
        }
    }

    useEffect(()=>{
        fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((wdata)=>{
            setUpdateEffect(false)
            if(wdata.err === undefined){
            setNumeberData(wdata)
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    },[updateEffect])

    useEffect(()=>{
        fetch('http://localhost:8080/api/getTopReviews')
        .then((response)=>response.json())
        .then((data)=>{
            setreviewData(data)
        })

    },[])

    const updateNumber = (num,arrayProductid,productid) =>{
        if(num){
         var number = num[count]
         var pro = arrayProductid[count]
        }
        if(productid === pro){
         count = count +1
        }
         const handleAddItem = (e) => additem(e.target.value);
         const handleMinusItem = (e) => minusitem(e.target.value);
         if( !number || number.length ===0 || productid !== pro ){
             return(<button value ={productid} className="addButton" onClick={handleAddItem}>
                 + Add
                 </button>)
         }else{
           return(
           <div>
             <button value = {productid} onClick={handleMinusItem} className="lefthalfCircle">-</button>
             <button className="greenPill">{number}</button>
             <button value = {productid} onClick={handleAddItem} className="righthalfCircle">+</button>
             </div>)
         }
     }


     const findPicture = (productid) =>{

        if(productid ===1){
            return(<img style={{float:"left", padding:0,margin:0}}src = {greek} height = "70px" width= "70px"></img>)
        } else if(productid === 4){
            return(<img key ={productid} alt =""className="specialImage"src = {bruchetta} height = "30px" width= "30px"></img>)
        }else{
            return(<img key ={productid} alt =""className="specialImage"src = {lemondessert} height = "30px" width= "30px"></img>)
        }
    }

    return (<main>
        <div className="flex-container-main" style = {{"background-color":"#5C7600"}}>
            <div>
                <p className="headingOne" style = {{"color":"#D6D26D"}}> Little Lemon </p>
                <p className="headingTwo"style = {{"color":"#D6D26D"}}>Chicago</p>
                <p style = {{"color":"#D6D26D"}}>
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit,
                sed do eiusmod tempor <br></br>incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/register"><button className="blackbutton"> Reserve a table</button></Link>
            </div>
            <div style={{'padding-left':20}}>
                <img src = {MarioA} alt ="MarioA" width= "200px" height="200px"></img>
            </div>
        </div>
        <div className="grid-container-main" style = {{"background-color":"#D6D26D"}}>
            <div className="SpecialHeading">Special</div>
            <div><Link to="/menu"><button className="menubutton">Online Menu</button></Link></div>
            <div className="card">
                <img src= {greek} alt = "greeksalad" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Greek Salad</span>  <span style={{"float":"right"}}>$12.99</span> </p>
                    <EllipsisTextContainer
                    text ="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofItems)}),
                        numberData.map((item)=>{return(item.productid)}),
                        1
                        )}
            </div>
            <div className="card">
            <img src = {bruchetta} alt = "bruchetta" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Bruchetta </span>   <span style={{"float":"right"}}>$5.99</span></p>
                    <EllipsisTextContainer
                    text ="Our Bruschetta is made
                    from grilled bread that has been smeared with garlic and seasoned
                     with salt and olive oil."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofItems)}),
                        numberData.map((item)=>{return(item.productid)}),
                        4)}
            </div>
            <div className="card">
            <img src = {lemondessert} alt = "lemondessert" className="specialImage"></img>
                    <p style={{ "margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Lemon Dessert</span>  <span style={{"float":"right"}}>$5.99</span></p>
                    <EllipsisTextContainer
                    text ="This comes straight from grandma’s
                    recipe book, every last ingredient has been sourced
                    and is as authentic as can be imagined."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofItems)}),
                        numberData.map((item)=>{return(item.productid)}),
                        5)}
            </div>
        </div>
        <div className="grid-container-testimonials" style = {{"background-color":"#5C7600"}}>
            <div className="testHeading">testimonials</div>
            {reviewData.map((item)=>{
                return(
            <div className="card">
                <div>{item.Name}   {item.rating}/5</div>
                <table>
                    <tb>
                    {findPicture(item.productid)}
                    </tb>
                <tb >
                <EllipsisTextContainer
                text={item.Description}
                maxHeight="43px"
                maxWidth="200px"
                ></EllipsisTextContainer>
                </tb>
            </table>
            </div>)
            })}
        </div>
    </main>);
};

export default Main;