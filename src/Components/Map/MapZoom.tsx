import React, { useReducer } from 'react';

import classes from "./Map.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

interface Action {
    type: string
}

const initialState = {scale: 0.3};
const scaleMultiplier: number = 0.8;

const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case "increment":
            return { scale: state.scale /= scaleMultiplier };
        case "decrement":
            return { scale: state.scale *= scaleMultiplier };
        default:
            throw new Error();
    }
}

const MapZoom = (props: any) => {

    const searchMinusIcon = <span className={classes.icon}><FontAwesomeIcon icon={faSearchMinus} className="fas fa-2x" /></span>;
    const searchPlusIcon = <span className={classes.icon}><FontAwesomeIcon icon={faSearchPlus} className="fas fa-2x" /></span>;

    const [state, dispatch] = useReducer(reducer, initialState);

    props.zoomHandler(state.scale);

    return <div className={classes.buttonZoom}>
                <button onClick={() => dispatch({type: "decrement"})}>{searchMinusIcon}</button>
                <button onClick={() => dispatch({type: "increment"})}>{searchPlusIcon}</button>
            </div>

}
    

export default MapZoom;