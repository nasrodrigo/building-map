import React, { useReducer } from 'react';

import classes from "./Map.module.css";

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

    const [state, dispatch] = useReducer(reducer, initialState);

    props.zoomHandle(state.scale);

    return <div className={classes.buttonZoom}>
            <button onClick={() => dispatch({type: "decrement"})}>-</button>
            <button onClick={() => dispatch({type: "increment"})}>+</button>
        </div>

}
    

export default MapZoom;