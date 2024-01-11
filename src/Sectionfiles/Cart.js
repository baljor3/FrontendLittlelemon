import {React, useEffect, useState, useCallback} from "react"
import Cookies from "js-cookie";
import bruchetta from "../asset/bruchetta.png"
import greek from "../asset/greek salad.jpg"
import lemondessert from  "../asset/lemon dessert.jpg"


const Cart=()=>{
    var [data, setData] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    const[subtotal, setSubtotal] = useState();
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



    // TODO:UseEffect is called mutiple times instead of once, hence creating mutiple re-renders.
    useEffect( () =>{
         fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((wdata)=>{
            setUpdateEffect(false)
            setData(wdata)
            console.log(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[updateEffect])

    function getImage(num) {
        if(num ===1){
            return(<img  src = {greek} alt ="MarioA" width= "150px" height="100px" />)
        } else if(num === 4){
        return(<img src = {bruchetta} width= "150px" height="100px"></img>)
         }else{
        return(<img  src = {lemondessert} width= "150px" height="100px"></img>)
        }
    }

    function listItems(data){
        if(data.err === 'Unauthorized'){
            return(<p>Please login to add items to cart</p>)
        }
        if(data === undefined || data.length === 0 || data.length === undefined  || data === "undefined"){
            return(<p>No items in the cart</p>)
        }else{
            console.log(data[0]["total"])
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
                <div style={{display:"grid",justifyContent:"center",alignItems: "center"}}>
                    <p>subTotal: {sum}</p>
                    <p>Taxes: {taxes}</p>
                    <p>Total: {grandtotal}</p>
                </div>
            )
        }
    }

    return(
        <body style={{backgroundColor:"#5C7600",display:"flex",justifyContent: "center", alignItems: "center",}}>
            <div style={{justifyContent:"center",alignItems: "center"}}>
                {listItems(data)}
                {showTotal()}
            </div>

        </body>
    )
    
}

export default Cart;