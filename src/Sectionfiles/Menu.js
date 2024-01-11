import React, { useEffect, useState, useCallback } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import bruchetta from "../asset/bruchetta.png"
import lemonDessert from "../asset/lemon dessert.jpg"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';
import EllipsisTextContainer from './EllipsisTextContainer';



const Menu=() => {
    const [productList, setProductList] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    const [numberData, setNumeberData] = useState([]);
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

    useEffect( ()=>{
         fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((wdata)=>{
            if(wdata.err === undefined){
            setNumeberData(wdata)
            }
        }).catch((err)=>{
            console.log(err.message);
        });
},[updateEffect])

    useEffect(()=>{
        fetch('http://localhost:8080/api/getProducts',{
            method: "GET"
        }).then((response)=>response.json())
        .then((data)=>{
            setProductList(data)
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
            return(<img key ={productid} alt =""className="specialImage"src = {greek} height = "70px" width= "70px"></img>)
        } else if(productid === 4){
            return(<img key ={productid} alt =""className="specialImage"src = {bruchetta} height = "70px" width= "70px"></img>)
        }else{
            return(<img key ={productid} alt =""className="specialImage"src = {lemonDessert} height = "70px" width= "70px"></img>)
        }
    }

    return(
        <main>
        <div className="grid-container-menu" style = {{"background-color":"#5C7600"}}>
            {productList.map((item)=>{
                return(
                    <div className="card">
                       {findPicture(item.productid)}
                       <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>{item.name} </span>  <span style={{"float":"right"}}>{item.price}</span> </p>
                    <EllipsisTextContainer
                        text = {item.description}
                        width = "200px"
                        height ="60px">
                    </EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofitems)}),
                        numberData.map((item)=>{return(item.productid)}),
                        item.productid
                        )}
                    <br></br><Link to={`/review/${item.productid}`}>Reviews</Link>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Menu;