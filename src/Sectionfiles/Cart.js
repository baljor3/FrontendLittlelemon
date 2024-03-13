import {React, useEffect, useState} from "react"
import Cookies from "js-cookie";
import bruchetta from "../asset/bruchetta.png"
import greek from "../asset/greek-salad.jpg"
import lemondessert from  "../asset/lemon-dessert.jpg"
import PopupGfg from "./CartCheckout"
import GetAPIS from "../APIS/GetAPIS";
import ErrorScreen from "./errorScreen"
import ThankyouWindow from "./Thankyou";

const Cart=()=>{
    const [data, setData] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [thankscreen, setThankScreen] = useState(false);
    const [errScreen, setErrScreen] = useState(false);
    const apis = new GetAPIS
    //TODO: after user checkouts show loading screen. once loading screen is done send a message saying order has been placed.

    const changeErrorScreen = () =>{
        setErrScreen(prev => !prev)
    }
    const ChangeThank = () =>{
        setThankScreen(prev => !prev)
    }

    const additem = async(v) =>{
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('https://backend-littlelemon.vercel.app/api/additem', {
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
            await fetch('https://backend-littlelemon.vercel.app/api/deleteitem', {
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
        data.forEach(item => {
            console.log("Item:", item);
            // Log specific properties of the item if needed
            console.log("Product ID:", item.productid);
            console.log("Name:", item.name);
            console.log("Price:", item.price);
            // Add more properties as needed
        });
    },[data])

    const Cart = async() =>{
        try{
           const result = await apis.getCart(jwtToken)
           if(result !== undefined){
           setData(result)
           }
        }catch (err){
            console.log(err)
        }
        }
       

   
    useEffect( () =>{
        Cart()
    },[updateEffect])

    function getImage(num) {
        if(num ===3){
            return(<img  src = {greek} alt ="MarioA" width= "150px" height="100px" />)
        } else if(num === 1){
        return(<img src = {bruchetta} width= "150px" height="100px"></img>)
         }else{
        return(<img  src = {lemondessert} width= "150px" height="100px"></img>)
        }
    }

    const updatetheEffect = ()=>{
        setUpdateEffect(prev => !prev)
    }

    const closeOpenCheckout = ()=>{
        setPopUp(prev => !prev)
    }

    function listItems(data){
        if(data.err === 'Unauthorized'){
            return(<p>Please login to add items to cart</p>)
        }
        if(data === undefined || data.length === 0 || data.length === undefined  || data === "undefined"){
            return(<p>No items in the cart</p>)
        }else{
            return(data.map((item)=>{
                return(<div style={{display:"flex", alignItems: "center",borderBottom: "1px solid black"}} key={item.productid}>
                    <div >
                    {getImage(item.productid)}
                    </div>
                    <div>
                        <ul style={{listStyle:"None"}}>
                    <li>
                      Unit Price: {item.total/item.numberofitems}
                    </li>
                    <li>
                    Total: {item.total}
                    </li>
                    <li>
                      Units:  {item.numberofitems}
                    </li>
                    <li>
                    <button onClick={()=>additem(item.productid)}>add</button> 
                    <button onClick={ ()=>minusitem(item.productid)}>delete</button>
                    </li>
                    </ul>
                    </div>
                    </div>)
        }))
            }
        }
        function showTotal(){
            if(data.err === 'Unauthorized'){
                return(null)
            }
            if(data === undefined || data.length === 0 || data.length === undefined  || data === "undefined"){
                return(null)
        }else{
            const sum = data.map((item) => {
                return Number(item.total)
              }).reduce((acc, currentValue) => acc + currentValue, 0);
            const taxes = Math.round((sum *.12+ Number.EPSILON) *100)/100

            const grandtotal = taxes + sum

            return(
            <div>
                <div style={{display:"grid",justifyContent:"center",alignItems: "center"}}>
                    <p>subTotal: {sum}</p>
                    <p>Taxes: {taxes}</p>
                    <p>Total: {grandtotal.toFixed(2)}</p>
                <button onClick={closeOpenCheckout}>checkout</button>
                </div>
            </div>
            )
        }
    }
    

    return(
        <body style={{backgroundColor:"#5C7600", height:"100vh"
        
        }}>
            <div style={{display:"flex",justifyContent: "center", alignItems: "center",}}>
            <div style={{justifyContent:"center",alignItems: "center"}}>
                {listItems(data)}
                {showTotal()}

            </div>
            </div>
            {popUp ?
            <div style={{display: "flex",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 2,

            }}>
            <PopupGfg closeCheckout = {closeOpenCheckout} data = {data} effect ={updatetheEffect} changeThank ={ChangeThank} changeErr = {changeErrorScreen}/>
            </div>: null}
            {thankscreen ?
            <div style={{display: "flex",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 2,

            }}>
                <ThankyouWindow handleClose ={ChangeThank}/>
            </div>
            : null}

        {errScreen ?
            <div style={{display: "flex",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 2,

            }}>
                <ErrorScreen handleClose ={changeErrorScreen}/>
            </div>
            : null}
        </body>
    )
}

export default Cart;