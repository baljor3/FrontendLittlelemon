import ButtonsAPIS from "../APIS/ButtonAPIS"
import "../Css/Main.css"

const addDeleteButton = ({number, productid, jwtToken, setUpdateEffect}) => {
    const buttonsAPI = new ButtonsAPIS();
    const handleAddItem = async (e) => {
      try {
        await buttonsAPI.additem(e.target.value, jwtToken);
        setUpdateEffect((prev) => !prev);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const handleMinusItem = async (e) => {
      try {
        await buttonsAPI.minusitem(e.target.value, jwtToken);
        setUpdateEffect((prev) => !prev);
      } catch (error) {
        console.error("Error", error);
      }
    };
    if (!number || number.length === 0) {
      return (
        <button value={productid} className="addButton" onClick={handleAddItem}>
          + Add
        </button>
      );
    } else {
      return (
        <div>
          <button
            value={productid}
            onClick={handleMinusItem}
            className="lefthalfCircle"
          >
            -
          </button>
          <button className="greenPill">{number}</button>
          <button
            value={productid}
            onClick={handleAddItem}
            className="righthalfCircle"
          >
            +
          </button>
        </div>
      );
      }
    }

 export default addDeleteButton;