import React, { useEffect, useRef, useState } from 'react';
import Canvas, { canvas } from "../../Interfaces/Canvas";
import { Coordinate, possition } from "../../Interfaces/Person";

import MapZoom from "./MapZoom";

import MapImg from "../../img/floor-plant.gif";

const Map = ({ width, height }: Canvas) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvasState, setCanvasState] = useState<Canvas>(canvas);
    const [scaleUpdated, setScaleUpdated] = useState<number>(0);

    const moveCoordinate: Coordinate = possition;
    let mouseDown = false;

    const mapImg: HTMLImageElement = new Image();
    mapImg.src = MapImg;

    const getCanvas = () => {

        if (!canvasRef.current) {
            return;
        }

        const htmlCanvasElement: HTMLCanvasElement = canvasRef.current;
        const context = htmlCanvasElement.getContext('2d');

        if(!context){
            return;
        }
        
        setCanvasState(
            {
                canvas: htmlCanvasElement,
                context: context,
                scale: 0.3,
                translate: {x: window.innerWidth / 2, y: window.innerHeight / 2}
            }
        )

    }

    useEffect(() => {

        getCanvas();

    }, []);

    const drawMap = () => {

        if(!canvasState){
            return;
        }  
        
        if(!canvasState.canvas){
            return;
        } 
        
        if(!canvasState.context){
            return;
        } 

        if(!canvasState.translate){
            return;
        } 

        if(!canvasState.scale){
            return;
        } 

        const canvas = canvasState.canvas;
        const context = canvasState.context;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(canvasState.translate.x, canvasState.translate.y);
        context.scale(canvasState.scale, canvasState.scale);
        context.beginPath();

        const x = -mapImg.width / 2;
        const y = -mapImg.height / 2;
        context.drawImage(mapImg, x, y);

        context.restore();
    
    }

    useEffect(() => {

        window.onload = () => {
            drawMap();
        }

    }, [canvasState]);

    const zoomHandle = (scale: number) => {
        canvasState.scale = scale;
        drawMap();
    }

    const setMouseDownFalse = () => {
        mouseDown = false;
    }

    const contentPossitionHandle: any = (event: React.MouseEvent<HTMLCanvasElement>) => {
        
        mouseDown = true;
        
        if(!canvasState.translate){
            return;
        }

        moveCoordinate.x = event.clientX - canvasState.translate.x;
        moveCoordinate.y = event.clientY - canvasState.translate.y;

    };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', contentPossitionHandle);
        return () => {
            canvas.removeEventListener('mousedown', contentPossitionHandle);
        };
    }, [canvasState]);

    const newContentPossitionHandle: any = (event: React.MouseEvent<HTMLCanvasElement>) => {

        if(!canvasState.translate){
            return;
        }
        
        if(mouseDown){
            canvasState.translate.x = event.clientX - moveCoordinate.x;
            canvasState.translate.y = event.clientY - moveCoordinate.y;
            drawMap();
        }
    };

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', newContentPossitionHandle);
        canvas.addEventListener('mouseup', setMouseDownFalse);
        canvas.addEventListener('mouseover', setMouseDownFalse);
        canvas.addEventListener('mouseout', setMouseDownFalse);
        return () => {
            canvas.removeEventListener('mousemove', newContentPossitionHandle);
            canvas.addEventListener('mouseup', setMouseDownFalse);
            canvas.addEventListener('mouseover', setMouseDownFalse);
            canvas.addEventListener('mouseout', setMouseDownFalse);
        };

    }, [canvasState]);

    return <>
                <MapZoom zoomHandle={zoomHandle}/>
                <canvas ref={canvasRef} height={height} width={width} />
            </>

}

Map.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
}

export default Map;