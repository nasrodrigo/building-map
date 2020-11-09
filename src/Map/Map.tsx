import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapImg from '../img/floor-plant.gif';
import Marker from '@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg';

interface CanvasProps {
    width: number;
    height: number;
}

type Canvas = {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    scale: number;
    translate: Coordinate;
}

type Coordinate = {
    x: number;
    y: number;
}

const Map = ({ width, height }: CanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const zoomInRef = useRef<HTMLButtonElement>(null);
    const zoomOutRef = useRef<HTMLButtonElement>(null);

    const scaleMultiplier: number = 0.8;
    const scale = {value: 0.3};
    const translate: Coordinate = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const moveCoordinate: Coordinate = {x: 0, y:0};
    const mouseDown = {value: false};

    const setMouseDownFalse = () => {
        mouseDown.value = false;
    }

    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    
    const [mapImageState] = useState(
        () => {
            const mapImg = new Image();
            mapImg.src = MapImg;
            return mapImg
        }
    );

    const [markerImageState] = useState(
        () => {
            const markerImg = new Image();
            markerImg.src = Marker;
            return markerImg;
        }
    );

    const getCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if(!context){
            return;
        }
        
        const cvn: Canvas = {canvas: canvas, 
                            context: context, 
                            scale: scale.value,
                            translate: translate,
                            };

        return cvn;
    };

    const draw = (props: Canvas) => {

        const canvas = props.canvas;
        const context = props.context;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(props.translate.x, props.translate.y);
        context.scale(props.scale, props.scale);
        context.beginPath();

        const x = -mapImageState.width / 2;
        const y = -mapImageState.height / 2;
        context.drawImage(mapImageState, x, y);

        context.restore();
    
    };

    useEffect(() => {

        const canvas = getCanvas();

        if(!canvas){
            return;
        }
        
        window.onload = () => {
            draw(canvas);
        }

    }, []);

    const zoomInHandle = () => {

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        canvas.scale = scale.value /= scaleMultiplier;

        draw(canvas);

    };

    useEffect(() => {

        if (!zoomInRef.current) {
            return;
        }

        const zoomInButton: HTMLButtonElement = zoomInRef.current;
        
        zoomInButton.addEventListener('click', zoomInHandle);
        
        return () => {
            zoomInButton.removeEventListener('click', zoomInHandle);
        };

    }, []);

    const zoomOutHandle = () => {
        
        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        canvas.scale = scale.value *= scaleMultiplier;

        draw(canvas);

    };

    useEffect(() => {

        if (!zoomOutRef.current) {
            return;
        }

        const zoomOutButton: HTMLButtonElement = zoomOutRef.current;
        
        zoomOutButton.addEventListener('click', zoomOutHandle);
        
        return () => {
            zoomOutButton.removeEventListener('click', zoomOutHandle);
        };

    }, []);

    const contentPossitionHandle = (props: any) => {
        mouseDown.value = true;

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        moveCoordinate.x = props.clientX - canvas.translate.x;
        moveCoordinate.y = props.clientY - canvas.translate.y;
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
    }, []);

    const newContentPossitionHandle = (props: any) => {
        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        if(mouseDown.value){
            canvas.translate.x = props.clientX - moveCoordinate.x;
            canvas.translate.y = props.clientY - moveCoordinate.y;
            draw(canvas);
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

    }, []);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };


    return <div>
                <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                    <button ref={zoomInRef}>+</button>
                    <button ref={zoomOutRef}>-</button>
                </div>
                <canvas ref={canvasRef} height={height} width={width} />
            </div>;

};

Map.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Map;
