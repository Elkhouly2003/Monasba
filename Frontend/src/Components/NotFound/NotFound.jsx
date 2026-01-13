import imageEror from "../../assets/icons/error.svg";
import Nav from "../Nav/Nav";
 
const NotFound = () => {
    return (
       <>       
       <Nav />
       <div>
        <img src={imageEror} alt="" />
       </div>
       </>
    );
}

export default NotFound;