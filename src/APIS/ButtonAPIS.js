

class ButtonsAPIS {

    async additem (productid,jwtToken) {
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('https://backend-littlelemon.vercel.app/additem', {
            method: "POST",
            body: JSON.stringify({
              "productid": productid
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
        } catch (error) {
            console.error('Error:', error);
            alert("Login to order items");
        }
    }
    
    async minusitem(productid,jwtToken){
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('https://backend-littlelemon.vercel.app/api/deleteitem', {
            method: "POST",
            body: JSON.stringify({
              "productid": productid
            }),
            headers: {
              "token": jwtToken,
              'Content-type': 'application/json'
            }
          });
        } catch (error) {
            console.error('Error:', error);
            alert("Login to order items");
        }
    }
    }
    
    export default ButtonsAPIS;