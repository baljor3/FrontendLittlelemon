import React, {useEffect, useState} from "react";
import greek from "../asset/greek-salad.jpg"
import Cookies from "js-cookie";
import bruchetta from "../asset/bruchetta.png"
import lemonDessert from "../asset/lemon-dessert.jpg"
import "../Css/Main.css"

const Review = ()=>{

    const [review, setReview] = useState()
    const [rating, setRating] = useState(1)
    const [reviewArray, setReviewArray] = useState([])
    const [productList, setProductList] = useState([])

    const jwtToken = Cookies.get('jwt_authorization')


    var path = window.location.pathname;
    var path = path.split('/')
    var path = path[path.length -1]

    useEffect(()=>{
        fetch(`https://backend-littlelemon.vercel.app/api/getProducts/${path}`,{
            method: "GET"
        }).then((response)=>response.json())
        .then((data)=>{
            setProductList(data)
        })
    },[])


    useEffect(() => {
        // Define a function to fetch reviews
        const fetchReviews = async () => {
          try {
            const response = await fetch('https://backend-littlelemon.vercel.app/api/getReviews', {
              method: 'POST',
              body: JSON.stringify({
                productid: path
              }),
              headers: {
                'Content-type': 'application/json'
              }
            });
            console.log(path)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setReviewArray(data);
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        // Call the fetchReviews function when the component mounts
        fetchReviews();
      }, []); // The empty dependency array ensures this runs only on component mount
    


const writeReview = async(rating,review)=>{
    await fetch('https://backend-littlelemon.vercel.app/api/writeReview',{
    method: "POST",
    body: JSON.stringify({
        rating: rating,
        description: review,
        productid: path
    }),headers:{
        "token":jwtToken,
        'Content-type':'application/json'
    }
    })
    .then((data)=>{
        console.log(data)
        console.log(reviewArray)
    }).catch((error)=>{
        console.log(error)
    })
}

const ratingSelection = [
    {
        name:"1",
        value: "1"
    },
    {
        name:"2",
        value:"2"
    },
    {
        name:"3",
        value:"3"
    },
    {
        name:"4",
        value:"4"
    },
    {
        name:"5",
        value:"5"
    }
]


const findPicture = (productid) =>{

    if(productid ===1){
        return(<img key ={productid} alt =""className="specialImage"src = {greek} height = "70px" width= "70px"></img>)
    } else if(productid === 4){
        return(<img key ={productid} alt =""className="specialImage"src = {bruchetta} height = "70px" width= "70px"></img>)
    }else{
        return(<img key ={productid} alt =""className="specialImage"src = {lemonDessert} height = "70px" width= "70px"></img>)
    }
}

const fun = (e)=>{
    if(jwtToken ==="" || jwtToken === undefined){
        alert("login to order items")
        e.preventDefault()
    }
    else{
    writeReview(rating,review)
    }
}

return(
<main style={{backgroundColor:"#5C7600", height:"100vh"}}>
        {productList.map((item)=>{
            return(
                <div class ="grid-container-review">
            <div> 
                <p> {item.name}</p>
                <p>{item.description}</p>
            </div>
            <div> {findPicture(item.productid)} </div>
            </div>)
        })}


    <div style={{justifyContent:"center", alignItems:"center", paddingBottom: "30px"}}>
       {reviewArray.map((item)=>{
        return(<div className="grid-cotainer-userReviews">
            <div>
           <span align-content = "left">{item.username}</span>  <span style={{position: "absolute", top: 0, right: 0}}>{item.rating}/5 </span>
           </div>
           <div>
           {item.description}
           </div>
        </div>)
       })}
    </div>

    <form className ="review-form" onSubmit={fun}>
        <div style={{marginBottom:"10px"}}>
    <select name = "rating" onChange={(e)=>{setRating(e.target.value)}}>
        {ratingSelection.map((item)=>{
            return(<option value={item.name}>{item.value}</option>)
        })}
    </select>
    </div>
    <textarea rows="4" cols = "50" onChange={(e)=>{setReview(e.target.value)}}></textarea>
    
    <button className="reivew-button">Add a Review!</button>
    </form>

   

</main>)

}

export default Review