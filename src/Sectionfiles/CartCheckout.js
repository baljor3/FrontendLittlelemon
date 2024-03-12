import 'reactjs-popup/dist/index.css';
import '../Css/Popup.css'
import React, { useState,useEffect } from 'react';
import Cookies from "js-cookie";


export default function PopupGfg({closeCheckout, data, effect, changeThank, changeErr}) {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [email, setEmail] =useState();
    const [load, setLoading] = useState(false);
    const [name, setName] = useState('')
   

    const jwtToken = Cookies.get('jwt_authorization')

    useEffect(()=>{
        fetch("https://backend-littlelemon.vercel.app/api/getName",{
            method:"GET",
            headers:{
                "token":jwtToken,
                'Content-type':'application/json',
            }
        }).then((result)=> {
            setName(result)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleCreditCardChange = (e) => {
        const formattedCreditCardNumber = e.target.value
            .replace(/[^\d]/g, '') // Remove non-digit characters
            .replace(/(.{4})/g, '$1-') // Add a dash every four characters
            .slice(0, 19); // Limit to 19 characters (4 digits/ + 3 dashes)
        setCreditCardNumber(formattedCreditCardNumber);
    };

    const handleExpiryDateChange = (e) => {
        const formattedExpiryDate = e.target.value
            .replace(/[^\d]/g, '') // Remove non-digit characters
            .replace(/(.{2})/, '$1/'); // Add a slash after the first two characters (MM/YY)
        setExpiryDate(formattedExpiryDate);
    };

    const handleCvvChange = (e) => {
        const formattedCvv = e.target.value.replace(/[^\d]/g, '').slice(0, 3); // Keep only the first three digits
        setCvv(formattedCvv);
    };
    const sendMessage = async (email) => {
        try {
            const response = await fetch('https://backend-littlelemon.vercel.app/api/sendMessage', {
                method: 'POST',
                body: JSON.stringify({
                    "email": email,
                    "items": data,
                    "name": name
                }),
                headers: {
                    "token": jwtToken,
                    'Content-type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error("Failed to send message"); // Throw an error if the response is not ok
            }
        } catch (err) {
            console.log(err);
            throw err; // Rethrow the error to be caught in the finish function
        }
    }



      const finish = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true)
        try {
          await sendMessage(email);
          console.log("after setting setLoading");
          closeCheckout(); // Close the checkout popup
          effect(); // Update the cart data
          setLoading(false)
          changeThank(); //Show thank you screen
        } catch (error) {
          console.error("Error occurred:", error);
          setLoading(false); // Reset loading state in case of error
          closeCheckout();
          changeErr(); // set Error Screen
        }
      }

    

    const LoadingScreen = ({})=>{
    return(
        <div className='loadContainer'>
           <div>Loading...</div>
           <div className='loading'></div>

        </div>
    )
    }

    return (
            <div>
                { load
                ?
                <LoadingScreen />
                :

                 <div className="popupContainer" >
            <span className="closeButton"
            onClick={closeCheckout}>
                X</span>
            <form className="popupForm" onSubmit={finish}>
                <div className="nameContainer">
                    <div>
                        <label className='label-popup'>First Name</label>
                        <input type="text" className='input-popup'
                        />
                    </div>
                    <div>
                        <labe className='label-popup'l>Last Name</labe>
                        <input type="text"  className='input-popup'/>
                    </div>
                </div>
                <label className='label-popup'l>Email</label>
                <input type="text" className='input-popup' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required/>
                <div className='creditCardContainer'>
                    <div className="labelRow">
                        <label className='label-popup'>Credit Card</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={creditCardNumber}
                            onChange={handleCreditCardChange}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            style={{ width: '23ch' }}
                            maxLength="19"
                        />
                    </div>
                    <div className="labelRow">
                        <label className='label-popup'>Expiry Date</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            style={{ width: '8ch' }}
                            maxLength="5"
                        />
                    </div>
                    <div className="labelRow">
                        <label className='label-popup'>CVV</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder='XXX'
                            style={{ width: '6ch' }}
                            maxLength="3"
                        />
                    </div>
                </div>
                <input type="submit"  className='input-popup-submit'/>
            </form>
        </div>
}
            </div>
    )
};