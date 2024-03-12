import React, { useEffect, useState } from "react";
import "../Css/Main.css"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';
import EllipsisTextContainer from './EllipsisTextContainer';
import GetAPIS from "../APIS/GetAPIS";
import AddDeleteButton from "../components/AddDeleteButton.js";
import FindPicture from "../components/FindPicture.js";


const Menu=() => {
    const [productList, setProductList] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    const [numberData, setNumeberData] = useState([]);
    const getAPI = new GetAPIS();


    useEffect( ()=>{
        const Cart = async() =>{
        try{
           const result = await getAPI.getCart(jwtToken)
           if(result !== undefined){
           setNumeberData(result)
           }
        }catch (err){
            console.log(err)
        }
        }
        Cart()
},[updateEffect])

    useEffect(()=>{
        const getProductList = async() =>{
            try{
                const result = await getAPI.getProductList()
                setProductList(result)
            }catch (err){
                console.log(err)
            }
        }
        getProductList()
    },[])


    return(
        <main style = {{"background-color":"#5C7600",height:"100vh"}}>
        <div className="grid-container-menu" >
            {productList.map((item)=>{
                return(
                    <div className="card">
                       <FindPicture
                       style={{width: "230px",
                        height: "103px",
                        borderRadius: "5px",
                        marginBottom: "0",
                        }}
                        productid = {item.productid}
                        height = "70px"
                        width = "70px"
                        />
                       <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>{item.name} </span>  <span style={{"float":"right"}}>{item.price}</span> </p>
                    <EllipsisTextContainer
                        text = {item.description}
                        width = "200px"
                        height ="60px">
                    </EllipsisTextContainer>
                    <AddDeleteButton
                        number =  {numberData
                                    .filter((numberItem) => numberItem.productid === item.productid)
                                    .map((numberItem) => numberItem.numberofitems)}
                        productid =  {item.productid}
                        jwtToken = {jwtToken}
                        setUpdateEffect = {setUpdateEffect}
                    />
                    <br></br><Link to={`/review/${item.productid}`}>Reviews</Link>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Menu;