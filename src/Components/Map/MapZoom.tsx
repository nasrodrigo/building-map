import React, { useReducer } from 'react';

import classes from "./Map.module.css";
import ZoomInImg from "../../img/zoom_in_FILL0_wght400_GRAD0_opsz48.svg";
import ZoomOutImg from "../../img/zoom_out_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from '../../Commons/Utils';

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

    const zoomInImg: HTMLImageElement = createImage(ZoomInImg);
    const zoomOutImg: HTMLImageElement = createImage(ZoomOutImg);

    const searchMinusIcon = <span className={classes.icon}><img alt="Zoom In" src={zoomInImg.src} className="fas fa-2x" /></span>;
    const searchPlusIcon = <span className={classes.icon}><img alt="Zoom Out" src={zoomOutImg.src} className="fas fa-2x" /></span>;

    const [state, dispatch] = useReducer(reducer, initialState);

    props.zoomHandler(state.scale);

    return <div className={classes.buttonZoom}>
                <button onClick={() => dispatch({type: "decrement"})}>{searchMinusIcon}</button>
                <button onClick={() => dispatch({type: "increment"})}>{searchPlusIcon}</button>
            </div>

}
    

export default MapZoom;