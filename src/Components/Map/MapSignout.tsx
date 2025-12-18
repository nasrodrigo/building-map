import { useNavigate } from "react-router-dom";
import { getLogedUser } from "../../Commons/Utils";
import classes from "./Map.module.css";

const MapSignout = () => {
  const navigate = useNavigate();
  const user = getLogedUser();

  const signOutHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.singout}>
      <p>What up {user.userName}!</p>
      <div>
        <button onClick={signOutHandler}>Sing Out</button>
      </div>
    </div>
  );
};

export default MapSignout;
