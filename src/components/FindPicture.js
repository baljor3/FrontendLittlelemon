import "../Css/Main.css"
import greek from "../asset/greek-salad.jpg"
import bruchetta from "../asset/bruchetta.png"
import lemonDessert from "../asset/lemon-dessert.jpg"

const findPicture = ({productid, height,width, style}) =>{

    if(productid ===3){

        return(<img key ={productid}
            style={style}
            alt ="GreekSalad"
            src = {greek}
            height = {height}
            width= {width}></img>)

    } else if(productid === 1){

        return(<img key ={productid}
            style={style}
            alt ="Bruchetta"
            src = {bruchetta}
            height = {height}
            width= {width}></img>)

    }else{

        return(<img key ={productid}
            style={style}
            alt ="LemonDessert"
            src = {lemonDessert}
            height = {height}
            width= {width}></img>)

    }
}

export default findPicture;