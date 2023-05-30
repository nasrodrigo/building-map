import { useHistory } from "react-router-dom";
import { getLogedUser } from "../../Commons/Utils";
import classes from "./Map.module.css";

const MapSignout = () => {
  const history = useHistory();
  const user = getLogedUser();

  const signOutHandler = () => {
    history.push("/");
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
