import "../Css/Popup.css"



    
    const errorScreen = ({handleClose}) =>{
    
        return (
            <div className='loadContainer'>
              <span className="closeButton" onClick={handleClose}>X</span>
              <div>Email was not found</div>
            </div>
          );
    
    }



export default errorScreen;