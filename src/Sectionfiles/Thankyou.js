import "../Css/Popup.css"

const ThankyouWindow = ({handleClose}) =>{

    return (
        <div className='loadContainer'>
          <span className="closeButton" onClick={handleClose}>X</span>
          <div>Order has been processed</div>
        </div>
      );

}

export default ThankyouWindow