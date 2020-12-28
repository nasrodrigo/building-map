import React from 'react';
import { useHistory } from "react-router-dom";

import { user } from "../../Interfaces/Person";

const MapSignout = (props: any) => {

    const history = useHistory();

    const signOutHandler = () => {
        history.push("/");
        props.setUserState(user);
    }

    return <div>
                <a>What up {props.user.userName}! </a>
                <button onClick={signOutHandler}>Sing Out</button>
            </div>

}
    

export default MapSignout;