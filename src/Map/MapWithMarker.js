import React, { useEffect, useRef, useState } from 'react';
import MapImg from '../img/floor-plant.gif';
import Marker from '@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg';

const Map = props => {

    const canvasRef = useRef();
    const zoomIn = useRef();
    const zoomOut = useRef();
    
    const scaleMultiplier = 0.8;

    let [canvasState, setCanvasState] = useState();

    let [boundingClientRectState, setBoundingClientRectState] = useState();

    let [scaleState, setScaleState] = useState(0.3);

    let [translateState, setTranslateState] = useState({x: window.innerWidth / 2, y: window.innerHeight / 2});

    let [mouseDownState, setMouseDownState] = useState(false);

    let [startDragOffsetState, setStartDragOffsetState] = useState({x: 0, y: 0});

    const [mapImageState] = useState(
        () => {
            const mapImg = new Image();
            mapImg.src = MapImg;
            return mapImg;
        }
    );

    const [markerImageState] = useState(
        () => {
            const markerImg = new Image();
            markerImg.src = Marker;
            return markerImg;
        }
    );

    const [contextState] = useState(
        () => {
            let canvas = canvasState;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let context = canvas.getContext('2d');
            
            return context;
        }
    );

    // const getContext = () => {
    //     let canvas = canvasState;
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     let context = canvas.getContext('2d');
        
    //     return context;
    // };

    // const getMapImage = () => {
    //     const mapImg = new Image();
    //     mapImg.src = MapImg;
    //     return mapImg;
    // };

    // const getMarkerImage = () => {
    //     const markerImg = new Image();
    //     markerImg.src = Marker;
    //     return markerImg;
    // };

    const zoomInHandle = () => {
        scaleState /= scaleMultiplier;
        setScaleState(scaleState);
        setScale();
    };

    const zoomOutHandle = () => {
        scaleState *= scaleMultiplier;
        setScaleState(scaleState);
        setScale();
    };

    const getMouseDown = props => {
        setMouseDownState(mouseDownState = true);
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
            setTranslate();
        }
    };

    const setMouseDonwFalse = () => {
        setMouseDownState(mouseDownState = false);
    };

    // const canvas = contextState;
    // canvas.translate(translateState.x, translateState.y);
    // canvas.scale(scaleState, scaleState);

    const setTranslate = () => {
        contextState.translate(translateState.x, translateState.y);
        draw();
    };

    const setScale = () => {
        contextState.scale(scaleState, scaleState);
        draw();
    };

    const draw = () => {

        contextState.translate(translateState.x, translateState.y);
        contextState.scale(scaleState, scaleState);
        const x = -mapImageState.naturalWidth / 2;
        const y = -mapImageState.naturalHeight / 2;

        contextState.drawImage(mapImageState, x, y);

        // let canvasMapImage = canvas.getImageData(0, 0, mapImageState.naturalWidth, mapImageState.naturalHeight);
        // setCanvasMapImageState(canvasMapImageState = canvasMapImage);
    
    };

    const mapMarker = props => {
        
        // const canvas = contextState;

        const rect = boundingClientRectState;

        const mouseXPos = props.clientX - rect.left;
        const mouseYPos = props.clientY - rect.top;

        const w = markerImageState.width / 2;
        const h = markerImageState.height / 2;
        
        const x = mouseXPos - (w / 2);
        const y = mouseYPos - h;

        // const x = mouseXPos - (markerImageState.width / 2);
        // const y = mouseYPos - markerImageState.height;
        
        contextState.drawImage(markerImageState, x, y, w, h);
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        setCanvasState(canvasState = canvas);
        
        setBoundingClientRectState(boundingClientRectState = canvas.getBoundingClientRect());

        canvas.addEventListener('mousedown', getMouseDown);

        canvas.addEventListener('mouseup', setMouseDonwFalse);

        canvas.addEventListener('mouseover', setMouseDonwFalse);

        canvas.addEventListener('mouseout', setMouseDonwFalse);

        canvas.addEventListener('mousemove', getMouseMove);

        canvas.addEventListener('dblclick', mapMarker);

        const btnZoomIn = zoomIn.current;
        btnZoomIn.addEventListener('click', zoomInHandle);

        const btnZoomOut = zoomOut.current;
        btnZoomOut.addEventListener('click', zoomOutHandle);
        
        window.onload = () => {
            draw();
        }
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