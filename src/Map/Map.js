import React, { useState, useRef, useEffect } from 'react';
import MapImg from '../img/floor-plant.gif';

const Map = props => {
    
    const canvasRef = useRef();
    
    const mapImg = new Image();
    mapImg.src = MapImg;

    let mapImgWInit = 0;
    let mapImgHInit = 0;
    let mapImgW = 0;
    let mapImgH = 0;
    let mapImgX = 0;
    let mapImgY = 0;
    let increase;
    let decrease;

    let [increaseState, setIncreaseState] = useState(increase = 1.2);
    let [decreaseState, setDecreaseState] = useState(decrease = 1.2);
    
    const zoomIn = () => {
        setIncreaseState(increase = 1.2);
        setDecreaseState(decrease = 0);
        reDraw(increaseState, decreaseState);
    };

    const zoomOut = () => {
        setDecreaseState(decrease = 1.2);
        setIncreaseState(increase = 0);
        reDraw(increaseState, decreaseState);
    };

    const reDraw = props => { 
        // console.log(increaseState);
        // console.log(decreaseState);
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        
        mapImgWInit = +mapImg.naturalWidth;
        mapImgHInit = +mapImg.naturalHeight;
        if(increase > 0){
            console.log('got in');
            console.log(increaseState);
            mapImgW = +((mapImgWInit / 3).toFixed() * increaseState);
            mapImgH = +((mapImgHInit / 3).toFixed() * increaseState);
            setIncreaseState(increaseState = increaseState + 1.2);
            setDecreaseState(decreaseState = decreaseState - 1.2);
        }else if(+decrease > 0){
            console.log('got out');
            console.log(decreaseState);
            mapImgW = +((mapImgWInit / 3).toFixed() - (((mapImgWInit / 3).toFixed() * decreaseState) - 1.2));
            mapImgH = +((mapImgHInit / 3).toFixed() - (((mapImgWInit / 3).toFixed() * decreaseState) - 1.2));
            setDecreaseState(decreaseState = decreaseState + 1.2);
            setIncreaseState(increaseState = increaseState - 1.2);
        }      
        mapImgX = +((window.innerWidth / 2).toFixed() - (mapImgW / 2).toFixed());
        mapImgY = +((window.innerHeight / 2).toFixed() - (mapImgH / 2).toFixed());

        context.drawImage(mapImg, mapImgX, mapImgY, mapImgW, mapImgH);
    
    };

    const draw = ctx => {
        mapImg.onload = () => {
            mapImgWInit = +mapImg.naturalWidth;
            mapImgHInit = +mapImg.naturalHeight;
            mapImgW = +(mapImgWInit / 3).toFixed();
            mapImgH = +(mapImgHInit / 3).toFixed();
            mapImgX = +((window.innerWidth / 2).toFixed() - (mapImgW / 2).toFixed());
            mapImgY = +((window.innerHeight / 2).toFixed() - (mapImgH / 2).toFixed());

            ctx.drawImage(mapImg, mapImgX, mapImgY, mapImgW, mapImgH);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        draw(context);
    }, []);

    return <div>
                <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>-</button>
                </div>
                <canvas ref={canvasRef} {...props}/>
            </div>;
    
}
export default Map;
