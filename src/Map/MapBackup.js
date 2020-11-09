import React, { useState, useRef, useEffect } from 'react';
import MapImg from '../img/floor-plant.gif';

const Map = props => {

    const canvasRef = useRef();
    const zoomIn = useRef();
    const zoomOut = useRef();

    let scaleMultiplier = 0.8;
    
    const getCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas;
    };

    const getContext = () => {
        const canvas = getCanvas();
        const context = canvas.getContext('2d');
        return context;
    };

    const getMapImage = () => {
        const mapImg = new Image();
        mapImg.src = MapImg;
        return mapImg;
    };

    let [mapImageState] = useState(getMapImage());

    let [scaleState, setScaleState] = useState(0.3);

    let [translateState, setTranslateState] = useState(
        {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }
    );

    let [mouseDownState, setMouseDownState] = useState(false);

    let [startDragOffsetState, setStartDragOffsetState] = useState({x: 0, y: 0});

    const zoomInHandle = () => {
        scaleState /= scaleMultiplier;
        setScaleState(scaleState);
        draw();
    };

    const zoomOutHandle = () => {
        scaleState *= scaleMultiplier;
        setScaleState(scaleState);
        draw();
    };

    const firstDraw = () => {
        window.onload = () => {
            draw();
        }
    };

    const getMouseDown = props => {
        setMouseDownState(mouseDownState = true);
        console.log(props.clientX);
        setStartDragOffsetState(
            startDragOffsetState = {
                x: props.clientX - translateState.x,
                y: props.clientY - translateState.y,
            }
        );
    };
    
    const getMouseMove = props => {
        if (mouseDownState) {
            setTranslateState(
                translateState = {
                    x: props.clientX - startDragOffsetState.x,
                    y: props.clientY - startDragOffsetState.y,
                }
            );
            draw();
        }
    };

    const setMouseDonwFalse = () => {
        setMouseDownState(mouseDownState = false);
    };

    const draw = () => {
        const context = getContext();
        context.translate(translateState.x, translateState.y);
        context.scale(scaleState, scaleState);
        let x = -mapImageState.naturalWidth / 2;
        let y = -mapImageState.naturalHeight / 2;
        context.drawImage(mapImageState, x, y);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', getMouseDown);

        canvas.addEventListener('mouseup', setMouseDonwFalse);

        canvas.addEventListener('mouseover', setMouseDonwFalse);

        canvas.addEventListener('mouseout', setMouseDonwFalse);

        canvas.addEventListener('mousemove', getMouseMove);

        const btnZoomIn = zoomIn.current;
        btnZoomIn.addEventListener('click', zoomInHandle);

        const btnZoomOut = zoomOut.current;
        btnZoomOut.addEventListener('click', zoomOutHandle);

        firstDraw();
    }, []);

    return <div>
                <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                    <button ref={zoomIn}>+</button>
                    <button ref={zoomOut}>-</button>
                </div>
                <canvas ref={canvasRef} {...props}/>
            </div>;

}

export default Map;

